package com.api.desafio.controller;

import com.api.desafio.model.Configuracoes;
import com.api.desafio.model.FichaEvolAtividadeMaterial;
import com.api.desafio.model.FichaEvolucao;
import com.api.desafio.service.ConfiguracoesService;
import com.api.desafio.service.FichaEvolAtividadeMaterialService;
import com.api.desafio.service.FichaEvolService;
import com.api.desafio.utils.DateUtil;
import com.api.desafio.utils.RelatorioUtil;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
public class FichaEvolucaoController {

    @Autowired
    private FichaEvolService fichaEvolService;
    @Autowired
    private FichaEvolAtividadeMaterialService evolAtividadeMaterial;
    @Autowired
    private ConfiguracoesService configuracoesService;

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastraFichaEvol")
    public ResponseEntity<FichaEvolucao> cadastrarFichaEvol(@RequestBody FichaEvolucao fichaEvolucao) {
        if (fichaEvolucao.getEvolId() != null) {
            FichaEvolucao evol = fichaEvolService.pesquisaPorCodigo(fichaEvolucao.getEvolId());
            for (FichaEvolAtividadeMaterial oldEv : evol.getFichaEvolAtividadeMaterialList()) {
                boolean possui = false;
                for (FichaEvolAtividadeMaterial newEv : fichaEvolucao.getFichaEvolAtividadeMaterialList()) {
                    if (oldEv.equals(newEv) && newEv.getFxatId() != null) {
                        possui = true;
                    }
                }
                if (!possui) {
                    evolAtividadeMaterial.remove(oldEv.getFxatId());
                }
            }
        }
        return fichaEvolService.salva(fichaEvolucao);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removeFichaEvol")
    public ResponseEntity<FichaEvolucao> removeFichaEvol(@RequestParam Integer evolId) {
        try {
            fichaEvolService.remove(evolId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaFichaEvol")
    public ResponseEntity<List<FichaEvolucao>> pesquisaFichaEvol(@RequestParam(required = false) Integer evolId, @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date evolData, @RequestParam(required = false) Integer pratId) {
        return fichaEvolService.pesquisa(evolId, evolData, pratId);
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/relatorioFichaEvolucao")
    public ResponseEntity<byte[]> gerarRelatorioFichaEvolucao(@RequestBody String jsonParams) {
        JsonObject jsonConvertido = new Gson().fromJson(jsonParams, JsonObject.class);
        JsonObject filtros = jsonConvertido.get("filtros").getAsJsonObject();
        Date dataIni = DateUtil.newDate(filtros.get("dataIni").getAsString());
        Date dataFim = DateUtil.newDate(filtros.get("dataFim").getAsString());
        Integer pratId = RelatorioUtil.getParamInteger(filtros, "pratId");
        List<FichaEvolucao> fichaEvol = fichaEvolService.pesquisaRelatorio(dataIni, dataFim, pratId).getBody();
        Configuracoes config = configuracoesService.getConfiguracoes();
        return RelatorioUtil.gerarRelatorios(jsonConvertido, fichaEvol, config);
    }
}

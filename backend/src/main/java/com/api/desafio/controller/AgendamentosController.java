package com.api.desafio.controller;

import com.api.desafio.model.*;
import com.api.desafio.service.*;
import com.api.desafio.utils.*;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class AgendamentosController {

    @Autowired
    private AgendamentoService agendamentoService;
    @Autowired
    private ConfiguracoesService configuracoesService;

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastrarAgendamento")
    public ResponseEntity<?> cadastrarAgendamento(@RequestBody Agendamento agendamento) {

        List<Agendamento> agendamentosDataHora = agendamentoService.pesquisaAgendamentosDiferetesDeDaMesmaDataEHora(agendamento.getAgdId(), agendamento.getAgdData(), agendamento.getAgdHora());
        if (ListUtil.isNotEmpty(agendamentosDataHora)) {
            Agendamento agendamentoJaRealizado = agendamentosDataHora.get(0);
            return ResponseEntity
                    .status(HttpStatus.ALREADY_REPORTED)
                    .body(String.format("Para essa data e hora existe um agendamento para o praticante %s", agendamentoJaRealizado.getPraticante().getPessoa().getPesNome()));
        }

        agendamentosDataHora = agendamentoService.pesquisaAgendamentosByAgdDataAndAgdHoraAndExistsAnimal(agendamento.getAgdData(), agendamento.getAgdHora(), agendamento.getAgdId(), agendamento.getAnimalList());
        if (ListUtil.isNotEmpty(agendamentosDataHora)) {
            Agendamento agendamentoJaRealizado = agendamentosDataHora.get(0);
            List<String> animaisString = agendamentoJaRealizado.getAnimalList().stream().map(ani -> ani.getAniNome()).collect(Collectors.toList());
            return ResponseEntity
                    .status(HttpStatus.ALREADY_REPORTED)
                    .body(String.format("Para essa data e hora existe um agendamento para o praticante %s com os animais %s", agendamentoJaRealizado.getPraticante().getPessoa().getPesNome(), StringUtil.join(animaisString, ", ")));
        }
        agendamentosDataHora = agendamentoService.pesquisaAgendamentosByAgdDataAndAgdHoraAndExistsFuncionario(agendamento.getAgdData(), agendamento.getAgdHora(), agendamento.getAgdId(), agendamento.getFuncionarioList());
        if (ListUtil.isNotEmpty(agendamentosDataHora)) {
            Agendamento agendamentoJaRealizado = agendamentosDataHora.get(0);
            List<String> funcionariosString = agendamentoJaRealizado.getFuncionarioList().stream().map(func -> func.getPessoa().getPesNome()).collect(Collectors.toList());
            return ResponseEntity
                    .status(HttpStatus.ALREADY_REPORTED)
                    .body(String.format("Para essa data e hora existe um agendamento para o praticante %s com os funcionários %s", agendamentoJaRealizado.getPraticante().getPessoa().getPesNome(), StringUtil.join(funcionariosString, ", ")));
        }
        agendamentosDataHora = agendamentoService.pesquisaAgendamentosByAgdDataAndAgdHoraAndExistsMaterial(agendamento.getAgdData(), agendamento.getAgdHora(), agendamento.getAgdId(), agendamento.getMaterialList());
        if (ListUtil.isNotEmpty(agendamentosDataHora)) {
            Agendamento agendamentoJaRealizado = agendamentosDataHora.get(0);
            List<String> materialString = agendamentoJaRealizado.getMaterialList().stream().map(mat -> mat.getMatDescricao()).collect(Collectors.toList());
            return ResponseEntity
                    .status(HttpStatus.ALREADY_REPORTED)
                    .body(String.format("Para essa data e hora existe um agendamento para o praticante %s utilizando os materiais %s", agendamentoJaRealizado.getPraticante().getPessoa().getPesNome(), StringUtil.join(materialString, ", ")));
        }

        agendamento = agendamentoService.salva(agendamento);
        if (agendamento != null) {
            return new ResponseEntity<>(agendamento, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removerAgendamento")
    public ResponseEntity<Agendamento> removerAgendamento(@RequestParam Integer agdId) {
        try {
            agendamentoService.remove(agdId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaAgendamentos")
    public ResponseEntity<List<Agendamento>> pesquisaAgendamentos(@RequestParam(required = false) Integer pratId, @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date agdData, @RequestParam(required = false) @DateTimeFormat(pattern = "HH:mm") Date agdHora, @RequestParam(required = false) boolean agdConcluido) {
        return agendamentoService.pesquisaAgendamentos(pratId, agdData, agdHora, agdConcluido);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaAgendamentosAtivos")
    public ResponseEntity<List<Agendamento>> pesquisaAgendamentosAtivos() {
        return agendamentoService.pesquisaAgendamentosAtivos();
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/relatorioAgendamentos")
    public ResponseEntity<byte[]> gerarRelatorioAgendamentos(@RequestBody String jsonParams) {
        JsonObject jsonConvertido = new Gson().fromJson(jsonParams, JsonObject.class);
        JsonObject filtros = jsonConvertido.get("filtros").getAsJsonObject();
        Date agdDataInicial = null;
        Date agdDataFinal = null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        try {
            if (!filtros.get("agdDataIncial").isJsonNull() && !filtros.get("agdDataIncial").getAsString().isEmpty()) {
                agdDataInicial = sdf.parse(filtros.get("agdDataIncial").getAsString());
            }
            if (!filtros.get("agdDataFinal").isJsonNull() && !filtros.get("agdDataFinal").getAsString().isEmpty()) {
                agdDataFinal = sdf.parse(filtros.get("agdDataFinal").getAsString());
            }
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }

        String situacao = filtros.get("agdConcluido").getAsString();
        Boolean agdConcluido = null;
        if (!situacao.isEmpty()) {
            agdConcluido = Boolean.valueOf(situacao);
        }
        List<Agendamento> agendamentos = agendamentoService.pesquisaAgendamentosDoPeriodo(agdDataInicial, agdDataFinal, agdConcluido).getBody();
        Configuracoes config = configuracoesService.getConfiguracoes();
        return RelatorioUtil.gerarRelatorios(jsonConvertido, agendamentos, config);
    }
}

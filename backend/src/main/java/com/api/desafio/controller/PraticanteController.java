package com.api.desafio.controller;

import com.api.desafio.model.Pessoa;
import com.api.desafio.model.Praticante;
import com.api.desafio.model.PraticanteResponsavel;
import com.api.desafio.service.PessoaService;
import com.api.desafio.service.PraticanteResponsavelService;
import com.api.desafio.service.PraticanteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PraticanteController {

    @Autowired
    private PraticanteService praticanteService;
    @Autowired
    private PessoaService pessoaService;
    @Autowired
    private PraticanteResponsavelService praticanteResponsavelService;

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastrarPraticante")
    public ResponseEntity<Praticante> cadastrarPraticante(@RequestBody Praticante praticante) {
        boolean adicionando = praticante.getPratId() == null;

        Pessoa pessoa = null;
        if (adicionando) {
            pessoa = pessoaService.getPessoaByPesCpf(praticante.getPessoa().getPesCpf());
            if (pessoa != null) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }

        praticante.getPessoa().getTelefoneList().forEach(tel -> tel.setPessoa(praticante.getPessoa()));
        praticante.getResponsaveis().forEach(resp -> resp.setPraticante(praticante));
        praticante.getDocumentosList().forEach(doc -> doc.setPraticante(praticante));

        pessoaService.salva(praticante.getPessoa());
        return new ResponseEntity<Praticante>(praticanteService.salva(praticante), HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaPraticantes")
    public ResponseEntity<List<Praticante>> pesquisaPraticantes(@RequestParam(required = false) String pesCpf, @RequestParam(required = false) String pesNome, @RequestParam(required = false) Integer pratId) {
        return praticanteService.pesquisaPraticantes(pesCpf, pesNome, pratId);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removePraticante")
    public ResponseEntity<Praticante> removePraticante(@RequestParam(required = false) Integer pratId) {
        try {
            praticanteService.remove(pratId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removerResponsavelSelecionado")
    public ResponseEntity<PraticanteResponsavel> removerResponsavelSelecionado(@RequestParam(required = false) Integer pxrId) {
        try {
            praticanteResponsavelService.remove(pxrId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }
}

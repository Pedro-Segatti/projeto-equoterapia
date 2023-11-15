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
public class ResponsavelController {

    @Autowired
    private ResponsavelService responsavelService;
    @Autowired
    private PessoaService pessoaService;

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastrarResponsavel")
    public ResponseEntity<Responsavel> cadastrarResponsavel(@RequestBody Responsavel responsavel) {
        boolean adicionando = responsavel.getRespId() == null;

        Pessoa pessoa = null;
        if (adicionando) {
            pessoa = pessoaService.getPessoaByPesCpf(responsavel.getPessoa().getPesCpf());
            if (pessoa != null) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }

        responsavel.getPessoa().getTelefoneList().forEach(tel -> tel.setPessoa(responsavel.getPessoa()));

        pessoaService.salva(responsavel.getPessoa());
        return new ResponseEntity<Responsavel>(responsavelService.salva(responsavel), HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaResponsavel")
    public ResponseEntity<List<Responsavel>> pesquisaResponsavel(@RequestParam(required = false) String pesCpf, @RequestParam(required = false) String pesNome, @RequestParam(required = false) Integer respId) {
        return responsavelService.pesquisaResponsavel(pesCpf, pesNome, respId);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removeResponsavel")
    public ResponseEntity<Responsavel> removeResponsavel(@RequestParam Integer respId) {
        try {
            Responsavel responsavel = responsavelService.remove(respId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }
}

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
public class LogradouroController {

    @Autowired
    private LogradouroService logradouroService;
    @Autowired
    private CidadeService cidadeService;
    @Autowired
    private BairroService bairroService;
    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaLogradouros")
    public ResponseEntity<List<Logradouro>> pesquisaLogradouros(@RequestParam(required = false) String logDesc, @RequestParam(required = false) Integer logId) {
        List<Logradouro> logradouros = logradouroService.getLogradouroByDescricaoAndId(logDesc, logId);
        return new ResponseEntity<List<Logradouro>>(logradouros, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastraLogradouro")
    public ResponseEntity<?> cadastrarLogradouro(@RequestBody Logradouro logradouro) {
        return logradouroService.salva(logradouro);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removeLogradouro")
    public ResponseEntity<Logradouro> removerLogradouro(@RequestParam Integer logId) {
        try {
            Logradouro logradouro = logradouroService.remove(logId);
            return new ResponseEntity<>(logradouro, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

    }

    @CrossOrigin(origins = "*")
    @GetMapping("/logradouroPorCep")
    public ResponseEntity<Logradouro> pesquisaPraticantes(@RequestParam String cep) {
        Cep enderecoEncontrado = IntegracaoViaCep.findCep(cep);
        if (enderecoEncontrado.isErro()) {
            return new ResponseEntity<Logradouro>(new Logradouro(), HttpStatus.NOT_FOUND);
        }
        Logradouro logradouro = new Logradouro();
        if (enderecoEncontrado != null) {
            List<Logradouro> logradouros = logradouroService.getLogradouroByDescricaoOrBairro(enderecoEncontrado.getLogradouro(), enderecoEncontrado.getBairro());

            if (ListUtil.isNotEmpty(logradouros)) {
                Logradouro logNoBanco = logradouros.stream().filter(log -> log.getLogDescricao().toUpperCase().equals(enderecoEncontrado.getLogradouro().toUpperCase())).findFirst().orElse(null);
                if (logNoBanco == null) {
                    logNoBanco = logradouros.stream().filter(log -> log.getBairro().getBarNome().toUpperCase().equals(enderecoEncontrado.getBairro().toUpperCase())).findFirst().orElse(null);
                    logradouro.setBairro(logNoBanco.getBairro());
                    logradouro.setLogDescricao(enderecoEncontrado.getLogradouro());
                } else {
                    logradouro = logNoBanco;
                }
            } else {
                logradouro.setLogDescricao(enderecoEncontrado.getLogradouro());
                Bairro bairro = new Bairro();
                bairro.setBarNome(enderecoEncontrado.getBairro());
                Cidade cidade = cidadeService.getCidadeByNome(enderecoEncontrado.getLocalidade()).get(0);
                bairro.setCidade(cidade);
                bairro = (Bairro) bairroService.salva(bairro).getBody();
                logradouro.setBairro(bairro);
            }
            logradouro.setLogCep(enderecoEncontrado.getCep().replaceAll("-", ""));
        }
        return new ResponseEntity<Logradouro>(logradouro, HttpStatus.OK);
    }
}

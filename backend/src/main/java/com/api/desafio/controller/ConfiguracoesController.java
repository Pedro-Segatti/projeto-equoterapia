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
public class ConfiguracoesController {

    @Autowired
    private ConfiguracoesService configuracoesService;

    @CrossOrigin(origins = "*")
    @GetMapping("/configuracoes")
    public ResponseEntity<Configuracoes> getConfiguracoes() {
        Configuracoes configuracoes = configuracoesService.getConfiguracoes();
        return new ResponseEntity<Configuracoes>(configuracoes, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/configuracoes")
    public ResponseEntity<?> cadastrarConfiguracoes(@RequestBody Configuracoes configuracoes) {
        return configuracoesService.salva(configuracoes);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaConfiguracoes")
    public ResponseEntity<Configuracoes> pesquisaConfiguracoes(@RequestParam(required = false) Integer confId) {
        return configuracoesService.pesquisaConfiguracoes(confId);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removeConfiguracoes")
    public ResponseEntity<?> removeConfiguracoes(@RequestParam Integer confId) {
        try {
            configuracoesService.remove(confId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }
}

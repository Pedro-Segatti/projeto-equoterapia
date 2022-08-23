package com.api.desafio.controller;

import com.api.desafio.service.ComunicacaoBanco;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class ComunicacaoController {

    @Autowired
    private ComunicacaoBanco cs;

    @CrossOrigin(origins = "*")
    @GetMapping("/")
    public String index(){
        return "Parabéns! Você está acessando a API. Hope you like it :)";

    }

    @CrossOrigin(origins = "*")
    @PostMapping("/calcular")
    public ResponseEntity<?> calcular(@RequestBody Integer numero){
        return cs.buscar(numero);
    }

}
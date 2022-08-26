package com.api.desafio.controller;

import com.api.desafio.service.AnimalCrud;
import com.api.desafio.service.AnimalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class ComunicacaoController {

    @Autowired
    private AnimalService as;

    @CrossOrigin(origins = "*")
    @GetMapping("/")
    public ResponseEntity<?> index(){
        return as.busca(1);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/calcular")
    public ResponseEntity<?> calcular(@RequestBody Integer numero){
        return as.busca(numero);
    }

}
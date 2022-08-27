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
    @PostMapping("/cadsatraAnimal")
    public ResponseEntity<?> calcular(@RequestBody String nome){
        return as.salva(nome);
    }

}
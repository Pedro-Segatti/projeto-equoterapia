package com.api.desafio.controller;

import com.api.desafio.model.Animal;
import com.api.desafio.service.AnimalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class ComunicacaoController {

    @Autowired
    private AnimalService as;

    @CrossOrigin(origins = "*")
    @GetMapping("/buscaAnimal")
    public ResponseEntity<?> index(@RequestBody Animal animal){
            return as.busca(animal.getAniNome());
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastraAnimal")
    public ResponseEntity<?> cadastrarAnimal(@RequestBody Animal animal){
        return as.salva(animal);
    }
}
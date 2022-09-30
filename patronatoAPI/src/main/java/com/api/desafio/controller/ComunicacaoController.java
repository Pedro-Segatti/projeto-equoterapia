package com.api.desafio.controller;

import com.api.desafio.model.Animal;
import com.api.desafio.model.Pessoa;
import com.api.desafio.service.AnimalService;
import com.api.desafio.service.PessoaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class ComunicacaoController {

    @Autowired
    private AnimalService animalService;

    @Autowired
    private PessoaService pessoaService;

    @CrossOrigin(origins = "*")
    @GetMapping("/login")
    public boolean getAuthenticate(@RequestParam(defaultValue = "empty") String login, @RequestParam(defaultValue = "empty") String password){
        if(login == null || login.isEmpty()){
            return false;
        }

        if(password == null || password.isEmpty()){
            return false;
        }

        Pessoa pessoa = pessoaService.getPessoaByPesCpf(login);
        if(pessoa == null){
            return false;
        }

        if(pessoa.getPesLoginPassword().equals(password)){
            return false;
        }

        return false;
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/buscaAnimal")
    public ResponseEntity<?> buscarAnimal(@RequestBody Animal animal){
            return animalService.busca(animal);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastraAnimal")
    public ResponseEntity<?> cadastrarAnimal(@RequestBody Animal animal){
        return animalService.salva(animal);
    }
}
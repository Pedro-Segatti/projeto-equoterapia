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
public class AnimalController {

    @Autowired
    private AnimalService animalService;

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastraAnimal")
    public ResponseEntity<?> cadastrarAnimal(@RequestBody Animal animal) {
        return animalService.salva(animal);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removeAnimal")
    public ResponseEntity<Animal> removeAnimal(@RequestParam Integer aniId) {
        try {
            animalService.remove(aniId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaAnimal")
    public ResponseEntity<List<Animal>> pesquisaAnimais(@RequestParam(required = false) Integer aniId, @RequestParam(required = false) String aniNome) {
        return animalService.pesquisaAnimais(aniId, aniNome);
    }
}

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
public class BairroController {

    @Autowired
    private BairroService bairroService;

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastraBairro")
    public ResponseEntity<?> cadastrarBairro(@RequestBody Bairro bairro) {
        return bairroService.salva(bairro);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removeBairro")
    public ResponseEntity<Bairro> removerBairro(@RequestParam Integer barId) {
        try {
            Bairro bairro = bairroService.remove(barId);
            return new ResponseEntity<>(bairro, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaBairro")
    public ResponseEntity<List<Bairro>> pesquisaBairro(@RequestParam(required = false) String barNome, @RequestParam(required = false) Integer barId) {
        return bairroService.pesquisa(barNome, barId);
    }
}

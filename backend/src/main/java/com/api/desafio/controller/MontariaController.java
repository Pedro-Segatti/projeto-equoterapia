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
public class MontariaController {

    @Autowired
    private MontariaService montariaService;

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastraMontaria")
    public ResponseEntity<?> cadastrarMontaria(@RequestBody Montaria montaria) {
        return montariaService.salva(montaria);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removeMontaria")
    public ResponseEntity<Montaria> removerMontaria(@RequestParam Integer montId) {
        try {
            Montaria montaria = montariaService.remove(montId);
            return new ResponseEntity<>(montaria, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaMontaria")
    public ResponseEntity<List<Montaria>> pesquisaMontaria(@RequestParam(required = false) Integer montId, @RequestParam(required = false) String montDescricao) {
        return montariaService.pesquisa(montId, montDescricao);
    }
}

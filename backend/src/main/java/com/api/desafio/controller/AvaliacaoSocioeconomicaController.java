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
public class AvaliacaoSocioeconomicaController {

    @Autowired
    private AvalSocioeconService avalSocioeconService;

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastraAvalSocioEcon")
    public ResponseEntity<?> cadastrarAvalSocioEcon(@RequestBody AvalSocioecon avalSocioEcon) {
        return avalSocioeconService.salva(avalSocioEcon);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removeAvalSocioEcon")
    public ResponseEntity<AvalSocioecon> removerAvalSocioEcon(@RequestParam Integer aseId) {
        try {
            avalSocioeconService.remove(aseId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaAvalSocioEcon")
    public ResponseEntity<List<AvalSocioecon>> pesquisaAvalSocioEcon(@RequestParam(required = false) Integer praticante, @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date data) {
        return avalSocioeconService.pesquisa(praticante, data);
    }
}

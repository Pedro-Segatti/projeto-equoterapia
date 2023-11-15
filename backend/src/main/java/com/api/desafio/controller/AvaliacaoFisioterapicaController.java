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
public class AvaliacaoFisioterapicaController {

    @Autowired
    private AvalFisioterService avalFisioterService;

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastraAvalFisioter")
    public ResponseEntity<?> cadastrarAvalFisioter(@RequestBody AvalFisioter avalFisioter) {
        for (AnexoAft anex : avalFisioter.getAnexosList()) {
            if (anex.getAvalFisioter() == null) {
                anex.setAvalFisioter(avalFisioter);
            }
        }
        Date date = avalFisioter.getAftData();
        date.setTime(date.getTime() + ((4 * 60 * 60) * 1000));
        avalFisioter.setAftData(date);
        return avalFisioterService.salva(avalFisioter);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removeAvalFisioter")
    public ResponseEntity<AvalFisioter> removeAvalFisioter(@RequestParam Integer aftId) {
        try {
            avalFisioterService.remove(aftId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaAvalFisioter")
    public ResponseEntity<List<AvalFisioter>> pesquisaAvalFisioter(@RequestParam(required = false) Integer praticante, @RequestParam(required = false) Integer medico, @RequestParam(required = false) Integer funcionario, @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date data) {
        return avalFisioterService.pesquisa(praticante, medico, funcionario, data);
    }
}

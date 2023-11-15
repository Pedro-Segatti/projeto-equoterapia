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
public class AtividadeController {

    @Autowired
    private AtividadeService atividadeService;

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastraAtividade")
    public ResponseEntity<?> cadastrarAtividade(@RequestBody Atividade atividade) {
        return atividadeService.salva(atividade);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removeAtividade")
    public ResponseEntity<?> removeAtividade(@RequestParam Integer atvId) {
        try {
            atividadeService.remove(atvId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaAtividade")
    public ResponseEntity<List<Atividade>> pesquisaAtividade(@RequestParam(required = false) Integer atvId, @RequestParam(required = false) String atvDescricao) {
        return atividadeService.pesquisa(atvId, atvDescricao);
    }
}

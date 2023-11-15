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
public class MaterialController {

    @Autowired
    private MaterialService materialService;

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastraMaterial")
    public ResponseEntity<?> cadastrarMaterial(@RequestBody Material material) {
        return materialService.salva(material);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removeMaterial")
    public ResponseEntity<?> removeMaterial(@RequestParam Integer matId) {
        try {
            materialService.remove(matId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaMaterial")
    public ResponseEntity<List<Material>> pesquisaMaterial(@RequestParam(required = false) Integer matId, @RequestParam(required = false) String matDescricao) {
        return materialService.pesquisa(matId, matDescricao);
    }
}

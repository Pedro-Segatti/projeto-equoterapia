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
public class PicadeiroController {

    @Autowired
    private PicadeiroService picadeiroService;

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastraPicadeiro")
    public ResponseEntity<?> cadastrarPicadeiro(@RequestBody Picadeiro picadeiro) {
        return picadeiroService.salva(picadeiro);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removePicadeiro")
    public ResponseEntity<Picadeiro> removePicadeiro(@RequestParam Integer picId) {
        try {
            picadeiroService.remove(picId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaPicadeiro")
    public ResponseEntity<List<Picadeiro>> pesquisaPicadeiro(@RequestParam(required = false) Integer picId, @RequestParam(required = false) String picDescricao) {
        return picadeiroService.pesquisa(picId, picDescricao);
    }
}

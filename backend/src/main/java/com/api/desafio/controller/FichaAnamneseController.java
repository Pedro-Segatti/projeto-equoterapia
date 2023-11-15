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
public class FichaAnamneseController {

    @Autowired
    private FichaAnamneseService fichaAnamneseService;

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastraFichaAnamnese")
    public ResponseEntity<FichaAnamnese> cadastrarFichaAnamnese(@RequestBody FichaAnamnese fichaAnamnese) {
        for (AnexoAmn anex : fichaAnamnese.getAnexosList()) {
            if (anex.getFichaAnamnese() == null) {
                anex.setFichaAnamnese(fichaAnamnese);
            }
        }
        Date date = fichaAnamnese.getAmnData();
        date.setTime(date.getTime() + ((4 * 60 * 60) * 1000));
        fichaAnamnese.setAmnData(date);
        return fichaAnamneseService.salva(fichaAnamnese);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removeFichaAnamnese")
    public ResponseEntity<FichaAnamnese> removeFichaAnamnese(@RequestParam Integer amnId) {
        try {
            fichaAnamneseService.remove(amnId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaFichaAnamnese")
    public ResponseEntity<List<FichaAnamnese>> pesquisaFichaAnamnese(@RequestParam(required = false) Integer amnId, @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date amnData, @RequestParam(required = false) Integer pratId) {
        return fichaAnamneseService.pesquisa(amnId, amnData, pratId);
    }
}

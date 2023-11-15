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
public class PaisController {

    @Autowired
    private PaisService paisService;

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaPais")
    public Pais pesquisaPais(@RequestParam String paiIso) {
        return paisService.getPaisByIso(paiIso);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/buscaListaPaises")
    public List<Pais> pesquisaListaPaises() {
        List<Pais> paises = paisService.getPaises();
        return paises;
    }
}

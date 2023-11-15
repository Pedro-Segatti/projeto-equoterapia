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
public class CargoController {

    @Autowired
    private CargoService cargoService;

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastraCargo")
    public ResponseEntity<?> cadastrarCargo(@RequestBody Cargo cargo) {
        return cargoService.salva(cargo);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removeCargo")
    public ResponseEntity<?> removeCargo(@RequestParam Integer carId) {
        try {
            cargoService.remove(carId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaCargo")
    public ResponseEntity<List<Cargo>> pesquisaCargo(@RequestParam(required = false) Integer carId, @RequestParam(required = false) String carDescricao) {
        return cargoService.pesquisa(carId, carDescricao);
    }
}

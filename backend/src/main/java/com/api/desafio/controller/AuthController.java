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
public class AuthController {

    @Autowired
    private PessoaService pessoaService;

    @CrossOrigin(origins = "*")
    @GetMapping("/login")
    public ResponseEntity<?> getAuthenticate(@RequestParam String login, @RequestParam String password) {
        if (login == null || login.isEmpty() || password == null || password.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Pessoa pessoa = pessoaService.getPessoaByPesCpf(login);
        if (pessoa == null) {
            return new ResponseEntity<Pessoa>(HttpStatus.NOT_FOUND);
        }

        String encryptPassword = DigestUtils.md5Hex(password);
        if (pessoa.getPesLoginPassword().equals(encryptPassword)) {
            return new ResponseEntity<Pessoa>(pessoa, HttpStatus.OK);
        }

        return new ResponseEntity<Pessoa>(HttpStatus.NOT_FOUND);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pessoaLogada")
    public ResponseEntity<?> getPessoaLogada(@RequestParam Integer id) {
        if (id == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Pessoa pessoa = pessoaService.getPessoaByPesId(id);
        if (pessoa == null) {
            return new ResponseEntity<Pessoa>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Pessoa>(pessoa, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/encriptarSenha")
    public String encriptarSenha(@RequestParam String senha) {
        String encryptPassword = DigestUtils.md5Hex(senha);
        return encryptPassword;
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/testeConexao")
    public boolean testeConexao() {
        return true;
    }
}

package com.api.desafio.service;

import com.api.desafio.crudFiles.LogradouroCrud;
import com.api.desafio.crudFiles.PessoaCrud;
import com.api.desafio.model.Bairro;
import com.api.desafio.model.Logradouro;
import com.api.desafio.model.Pessoa;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.List;

@Component
@Transactional
public class LogradouroService {

    @Autowired
    private LogradouroCrud logradouroCrud;

    public Logradouro getLogradouroById(Integer logId){
        return logradouroCrud.findLogradouroByLogId(logId);
    }

    public List<Logradouro> getLogradouroByDescricaoAndId(String logDescricao, Integer logId){
        return logradouroCrud.findLogradouroByLogDescricaoAndId(logDescricao, logId);
    }

    public List<Logradouro> getLogradouroByDescricaoOrBairro(String logDescricao, String logDescBairro){
        return logradouroCrud.findLogradouroByLogDescricaoOrBairro(logDescricao, logDescBairro);
    }

    public ResponseEntity<?> salva(Logradouro logradouro) {
        logradouroCrud.save(logradouro);
        return new ResponseEntity<Logradouro>(logradouro, HttpStatus.OK);
    }

    public Logradouro remove(Integer logId) {
        Logradouro logradouro = logradouroCrud.findById(logId).orElse(null);
        logradouroCrud.delete(logradouro);
        return logradouro;
    }
}

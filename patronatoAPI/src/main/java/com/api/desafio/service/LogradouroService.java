package com.api.desafio.service;

import com.api.desafio.crudFiles.LogradouroCrud;
import com.api.desafio.crudFiles.PessoaCrud;
import com.api.desafio.model.Logradouro;
import com.api.desafio.model.Pessoa;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

@Component
@Transactional
public class LogradouroService {

    @Autowired
    private LogradouroCrud logradouroCrud;

    public Logradouro getLogradouroById(Integer logId){
        return logradouroCrud.findLogradouroByLogId(logId);
    }

}

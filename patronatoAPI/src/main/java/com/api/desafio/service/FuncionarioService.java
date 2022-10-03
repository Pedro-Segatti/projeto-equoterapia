package com.api.desafio.service;

import com.api.desafio.crudFiles.FuncionarioCrud;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

@Component
@Transactional
public class FuncionarioService {

    @Autowired
    private FuncionarioCrud fc;
}

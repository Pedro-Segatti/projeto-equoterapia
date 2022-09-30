package com.api.desafio.service;

import com.api.desafio.model.Pessoa;
import com.api.desafio.model.ResponseModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import javax.transaction.Transactional;

@Component
@Transactional
public class PessoaService {

    @Autowired
    private PessoaCrud pessoaCrud;

    public Pessoa getPessoaByPesCpf(String filtroCpf) {
        return pessoaCrud.findPessoaByPesCpf(filtroCpf);
    }

}

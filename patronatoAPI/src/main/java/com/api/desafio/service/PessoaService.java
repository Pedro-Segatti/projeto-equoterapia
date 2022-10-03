package com.api.desafio.service;

import com.api.desafio.crudFiles.PessoaCrud;
import com.api.desafio.model.Pessoa;
import org.springframework.beans.factory.annotation.Autowired;
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

    public Pessoa getPessoaByPesId(Integer pesId){
        return pessoaCrud.findPessoaByPesId(pesId);
    }

}

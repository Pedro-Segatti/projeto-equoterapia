package com.api.desafio.service;

import com.api.desafio.crudFiles.PraticanteCrud;
import com.api.desafio.model.Pessoa;
import com.api.desafio.model.Praticante;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

@Component
@Transactional
public class PraticanteService {

    @Autowired
    private PraticanteCrud praticanteCrud;

    public Praticante getPraticanteById(Integer pratId){
        return praticanteCrud.findByPratId(pratId);
    }

    public Praticante salva(Praticante pat) {
        pat = praticanteCrud.save(pat);
        return pat;
    }
}

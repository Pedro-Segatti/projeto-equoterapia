package com.api.desafio.service;

import com.api.desafio.crudFiles.LogradouroCrud;
import com.api.desafio.crudFiles.PaisCrud;
import com.api.desafio.model.Logradouro;
import com.api.desafio.model.Pais;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

@Component
@Transactional
public class PaisService {

    @Autowired
    private PaisCrud paisCrud;

    public Pais getPaisByIso(String paiIso){
        return paisCrud.findByPaiIso(paiIso);
    }

}

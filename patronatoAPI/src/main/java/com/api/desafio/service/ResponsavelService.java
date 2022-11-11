package com.api.desafio.service;

import com.api.desafio.crudFiles.ResponsavelCrud;
import com.api.desafio.model.Praticante;
import com.api.desafio.model.Responsavel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.List;

@Component
@Transactional
public class ResponsavelService {

    @Autowired
    private ResponsavelCrud rc;

    public ResponseEntity<List<Responsavel>> pesquisaResponsavel(String pesCpf, String pesNome) {
        List<Responsavel> responsavel = rc.findByCpfAndNome(pesCpf, pesNome);
        return new ResponseEntity<List<Responsavel>>(responsavel, HttpStatus.OK);
    }
}

package com.api.desafio.service;

import com.api.desafio.crudFiles.AvalFisioterCrud;
import com.api.desafio.crudFiles.FichaAnamneseCrud;
import com.api.desafio.model.AvalFisioter;
import com.api.desafio.model.FichaAnamnese;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.List;

@Component
@Transactional
public class FichaAnamneseService {
    @Autowired
    private FichaAnamneseCrud fac;

    public ResponseEntity<?> salva(FichaAnamnese fichaAnamnese) {
        fac.save(fichaAnamnese);
        return new ResponseEntity<FichaAnamnese>(fichaAnamnese, HttpStatus.OK);
    }

    public FichaAnamnese remove(Integer amnId) {
        FichaAnamnese fichaAnamnese = fac.findById(amnId).orElse(null);
        fac.delete(fichaAnamnese);
        return (fichaAnamnese);
    }

    public ResponseEntity<List<FichaAnamnese>> pesquisa() {
        List<FichaAnamnese> fichaAnamnese = (List<FichaAnamnese>) fac.findAll();
        return new ResponseEntity<List<FichaAnamnese>>(fichaAnamnese, HttpStatus.OK);
    }

    public FichaAnamnese pesquisaPeloCodigo(Integer id) {
        return fac.findById(id).orElse(null);
    }
}

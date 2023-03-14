package com.api.desafio.service;

import com.api.desafio.crudFiles.FichaAnamneseCrud;
import com.api.desafio.model.FichaAnamnese;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@Component
@Transactional
public class FichaAnamneseService {
    @Autowired
    private FichaAnamneseCrud fac;

    public ResponseEntity<FichaAnamnese> salva(FichaAnamnese fichaAnamnese) {
        return new ResponseEntity<FichaAnamnese>(fac.save(fichaAnamnese), HttpStatus.OK);
    }

    public void remove(Integer amnId) {
        FichaAnamnese fichaAnamnese = fac.findById(amnId).orElse(null);
        fac.delete(fichaAnamnese);
    }

    public ResponseEntity<List<FichaAnamnese>> pesquisa(Integer amnId, Date amnData, Integer pratId) {
        List<FichaAnamnese> fichaAnamnese = fac.findByIdAndData(amnId, amnData, pratId);
        return new ResponseEntity<List<FichaAnamnese>>(fichaAnamnese, HttpStatus.OK);
    }

    public FichaAnamnese pesquisaPeloCodigo(Integer id) {
        return fac.findById(id).orElse(null);
    }
}

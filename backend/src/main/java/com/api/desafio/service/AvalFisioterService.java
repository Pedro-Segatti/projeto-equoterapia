package com.api.desafio.service;

import com.api.desafio.crudFiles.AvalFisioterCrud;
import com.api.desafio.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@Component
@Transactional
public class AvalFisioterService {

    @Autowired
    private AvalFisioterCrud afc;

    public ResponseEntity<?> salva(AvalFisioter avalFisioter) {
        afc.save(avalFisioter);
        return new ResponseEntity<AvalFisioter>(avalFisioter, HttpStatus.OK);
    }

    public AvalFisioter remove(Integer aseId) {
        AvalFisioter avalFisioter = afc.findById(aseId).orElse(null);
        afc.delete(avalFisioter);
        return (avalFisioter);
    }

    public ResponseEntity<List<AvalFisioter>> pesquisa(Integer praticante, Integer medico, Integer funcionario, Date data){
        return new ResponseEntity<List<AvalFisioter>>(afc.findByPratAndMedAndFuncAndData(praticante, medico, funcionario, data), HttpStatus.OK);
    }

    public AvalFisioter pesquisaPeloCodigo(Integer id) {
        return afc.findById(id).orElse(null);
    }

}

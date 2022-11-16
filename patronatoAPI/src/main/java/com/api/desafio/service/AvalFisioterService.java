package com.api.desafio.service;

import com.api.desafio.crudFiles.AvalFisioterCrud;
import com.api.desafio.model.AvalFisioter;
import com.api.desafio.model.AvalSocioecon;
import com.api.desafio.model.ResponseModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
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

    public ResponseEntity<List<AvalFisioter>> pesquisa() {
        List<AvalFisioter> avalFisioter = (List<AvalFisioter>) afc.findAll();
        return new ResponseEntity<List<AvalFisioter>>(avalFisioter, HttpStatus.OK);
    }
}

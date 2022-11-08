package com.api.desafio.service;

import com.api.desafio.crudFiles.AvalSocioeconCrud;
import com.api.desafio.model.Animal;
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
public class AvalSocioeconService {

    @Autowired
    private AvalSocioeconCrud asc;

    public ResponseEntity<?> salva(AvalSocioecon avalSocioecon) {
        asc.save(avalSocioecon);
        ResponseModel rm = new ResponseModel();
        rm.setMensagem("Avaliação cadastrada com sucesso!");
        rm.setOcorrencias(null);
        return new ResponseEntity<ResponseModel>(rm, HttpStatus.OK);
    }

    public AvalSocioecon remove(Integer aseId) {
        AvalSocioecon avalSocioecon = asc.findById(aseId).orElse(null);
        asc.delete(avalSocioecon);
        return (avalSocioecon);
    }

    public ResponseEntity<List<AvalSocioecon>> pesquisa() {
        List<AvalSocioecon> avalSocioecon = (List<AvalSocioecon>) asc.findAll();
        return new ResponseEntity<List<AvalSocioecon>>(avalSocioecon, HttpStatus.OK);
    }
}

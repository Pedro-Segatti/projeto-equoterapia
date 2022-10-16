package com.api.desafio.service;

import com.api.desafio.crudFiles.FichaAnamneseCrud;
import com.api.desafio.crudFiles.FichaEvolucaoCrud;
import com.api.desafio.model.Animal;
import com.api.desafio.model.FichaEvolucao;
import com.api.desafio.model.ResponseModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.List;

@Component
@Transactional
public class FichaEvolService {
    @Autowired
    private FichaEvolucaoCrud fec;

    public ResponseEntity<?> salva(FichaEvolucao evolucao) {
        fec.save(evolucao);
        ResponseModel rm = new ResponseModel();
        rm.setMensagem("Ficha de evolução cadastrada com sucesso!");
        rm.setOcorrencias(null);
        return new ResponseEntity<ResponseModel>(rm, HttpStatus.OK);
    }

    public ResponseEntity<?> remove(Integer evolId) {
        FichaEvolucao evolucao = fec.findById(evolId).orElse(null);
        fec.delete(evolucao);
        ResponseModel rm = new ResponseModel();
        rm.setMensagem("Ficha de evolução removida com sucesso!");
        rm.setOcorrencias(null);
        return new ResponseEntity<ResponseModel>(rm, HttpStatus.OK);
    }

    public ResponseEntity<List<FichaEvolucao>> pesquisa(Integer evolId) {
        List<FichaEvolucao> evolucao = (List<FichaEvolucao>) fec.findAll();
        return new ResponseEntity<List<FichaEvolucao>>(evolucao, HttpStatus.OK);
    }
}

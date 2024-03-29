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
import java.util.Date;
import java.util.List;

@Component
@Transactional
public class FichaEvolService {
    @Autowired
    private FichaEvolucaoCrud fec;

    public ResponseEntity<FichaEvolucao> salva(FichaEvolucao evolucao) {
        return new ResponseEntity<FichaEvolucao>(fec.save(evolucao), HttpStatus.OK);
    }

    public void remove(Integer evolId) {
        FichaEvolucao evolucao = fec.findById(evolId).orElse(null);
        fec.delete(evolucao);
    }

    public ResponseEntity<List<FichaEvolucao>> pesquisa(Integer evolId, Date evolData, Integer pratId) {
        List<FichaEvolucao> evolucao = (List<FichaEvolucao>) fec.findByIdAndData(evolId, evolData, pratId);
        return new ResponseEntity<List<FichaEvolucao>>(evolucao, HttpStatus.OK);
    }

    public ResponseEntity<List<FichaEvolucao>> pesquisaRelatorio(Date dataIni, Date dataFim, Integer pratId) {
        List<FichaEvolucao> evolucao = (List<FichaEvolucao>) fec.findByPeriodo(dataIni, dataFim, pratId);
        return new ResponseEntity<List<FichaEvolucao>>(evolucao, HttpStatus.OK);
    }

    public FichaEvolucao pesquisaPorCodigo(Integer evolId) {
        return fec.findById(evolId).orElse(null);
    }
}

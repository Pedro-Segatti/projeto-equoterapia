package com.api.desafio.service;

import com.api.desafio.crudFiles.AtividadeCrud;
import com.api.desafio.model.Animal;
import com.api.desafio.model.Atividade;
import com.api.desafio.model.ResponseModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.List;

@Component
@Transactional
public class AtividadeService {

    @Autowired
    private AtividadeCrud ac;

    public ResponseEntity<?> salva(Atividade atividade) {
        ac.save(atividade);
        return new ResponseEntity<Atividade>(atividade, HttpStatus.OK);
    }

    public ResponseEntity<?> remove(Integer aniId) {
        Atividade atividade = ac.findById(aniId).orElse(null);
        ac.delete(atividade);
        return new ResponseEntity<Atividade>(atividade, HttpStatus.OK);
    }

    public ResponseEntity<List<Atividade>> pesquisa(Integer atvId, String atvDescricao) {
        List<Atividade> atividades =  (List<Atividade>) ac.findByIdAndDescricao(atvId,atvDescricao);
        return new ResponseEntity<List<Atividade>>(atividades, HttpStatus.OK);
    }
}

package com.api.desafio.service;

import com.api.desafio.model.Animal;
import com.api.desafio.model.ResponseModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.persistence.Id;
import javax.transaction.Transactional;

@Component
@Transactional
public class AnimalService {
    @Autowired
    private ResponseModel rm;

    @Autowired
    private AnimalCrud ac;

    public ResponseEntity<?> busca(Integer id) {
        rm.setMensagem(null);
        Animal animal = ac.findById(id).get();
        rm.setOcorrencias(animal.getAniNome());
        return new ResponseEntity<ResponseModel>(rm, HttpStatus.OK);
    }
}
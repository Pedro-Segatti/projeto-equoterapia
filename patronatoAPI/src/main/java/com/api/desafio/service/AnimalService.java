package com.api.desafio.service;

import com.api.desafio.model.Animal;
import com.api.desafio.model.ResponseModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.persistence.Id;

@Service
public class AnimalService {
    @Autowired
    private ResponseModel rm;

    @Autowired
    private AnimalCrud ac;

    public ResponseEntity<?> busca(Integer id) {
        rm.setMensagem(null);
        int codigo = 99999;
        Animal animal = ac.findById(codigo).get();
        rm.setOcorrencias(animal.getAniNome());
        rm.setTempo("100");
        return new ResponseEntity<ResponseModel>(rm, HttpStatus.OK);
    }
}

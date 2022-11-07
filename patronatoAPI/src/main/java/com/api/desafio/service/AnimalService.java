package com.api.desafio.service;

import com.api.desafio.crudFiles.AnimalCrud;
import com.api.desafio.model.Animal;
import com.api.desafio.model.ResponseModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Component
@Transactional
public class AnimalService {

    @Autowired
    private AnimalCrud ac;

    public ResponseEntity<?> salva(Animal animal) {
        ac.save(animal);
        ResponseModel rm = new ResponseModel();
        rm.setMensagem("Animal " + animal.getAniNome() + " cadastrado com sucesso!");
        rm.setOcorrencias(null);
        return new ResponseEntity<ResponseModel>(rm, HttpStatus.OK);
    }

    public Animal remove(Integer aniId) {
        Animal animal = ac.findById(aniId).orElse(null);
        ac.delete(animal);
        return animal;
    }

    public ResponseEntity<List<Animal>> pesquisaAnimais(Integer aniId, String aniNome) {
        List<Animal> animais = ac.findByIdAndNome(aniId, aniNome);
        return new ResponseEntity<List<Animal>>(animais, HttpStatus.OK);
    }
}

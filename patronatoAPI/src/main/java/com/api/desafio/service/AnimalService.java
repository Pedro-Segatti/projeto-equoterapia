package com.api.desafio.service;

import com.api.desafio.model.Animal;
import com.api.desafio.model.ResponseModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.repository.CrudRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.Arrays;

@Component
@Transactional
public class AnimalService {

    @Autowired
    private AnimalCrud ac;

    public ResponseEntity<?> busca(Animal filtroAnimal) {
        ResponseModel rm = new ResponseModel();
        Animal animal = ac.findByNomeAndPorte(filtroAnimal.getAniNome(), filtroAnimal.getAniPorte());
        if(animal != null){
            rm.setMensagem("O animal: " +  animal.getAniNome() + " possui o porte: " + animal.getAniPorte());
        }else{
            rm.setMensagem("Nenhum animal encontrado");
        }
        return new ResponseEntity<ResponseModel>(rm, HttpStatus.OK);
    }
    public ResponseEntity<?> salva(Animal animal) {
        ResponseModel rm = new ResponseModel();
        ac.save(animal);
        rm.setMensagem("Animal " + animal + " cadastrado com sucesso!");
        rm.setOcorrencias(null);
        return new ResponseEntity<ResponseModel>(rm, HttpStatus.OK);
    }
}

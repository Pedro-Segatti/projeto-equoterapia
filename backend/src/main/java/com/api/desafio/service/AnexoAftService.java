package com.api.desafio.service;

import com.api.desafio.crudFiles.AnexoAftCrud;
import com.api.desafio.crudFiles.FichaEvolucaoAtividadeMaterialCrud;
import com.api.desafio.model.AnexoAft;
import com.api.desafio.model.FichaEvolAtividadeMaterial;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

@Component
@Transactional
public class AnexoAftService {
    @Autowired
    private AnexoAftCrud afc;

    public void remove(Integer aaftId) {
        try {
            afc.deleteById(aaftId);
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}

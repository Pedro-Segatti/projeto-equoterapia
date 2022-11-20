package com.api.desafio.service;

import com.api.desafio.crudFiles.FichaEvolucaoAtividadeMaterialCrud;
import com.api.desafio.crudFiles.FichaEvolucaoCrud;
import com.api.desafio.model.FichaEvolAtividadeMaterial;
import com.api.desafio.model.FichaEvolucao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.List;

@Component
@Transactional
public class FichaEvolAtividadeMaterialService {
    @Autowired
    private FichaEvolucaoAtividadeMaterialCrud fec;

    public FichaEvolAtividadeMaterial remove(Integer atxmId) {
        FichaEvolAtividadeMaterial evolucao = fec.findById(atxmId).orElse(null);
        fec.delete(evolucao);
        return evolucao;
    }
}

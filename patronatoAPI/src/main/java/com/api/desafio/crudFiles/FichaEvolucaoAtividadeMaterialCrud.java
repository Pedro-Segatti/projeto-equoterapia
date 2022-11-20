package com.api.desafio.crudFiles;

import com.api.desafio.model.FichaEvolAtividadeMaterial;
import com.api.desafio.model.FichaEvolucao;
import org.springframework.data.repository.CrudRepository;

public interface FichaEvolucaoAtividadeMaterialCrud extends CrudRepository<FichaEvolAtividadeMaterial,Integer> {

}

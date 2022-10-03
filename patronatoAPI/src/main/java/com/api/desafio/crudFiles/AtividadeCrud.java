package com.api.desafio.crudFiles;

import com.api.desafio.model.Atividade;
import org.springframework.data.repository.CrudRepository;

public interface AtividadeCrud extends CrudRepository<Atividade,Integer> {
}

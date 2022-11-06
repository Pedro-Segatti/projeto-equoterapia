package com.api.desafio.crudFiles;

import com.api.desafio.model.Praticante;
import org.springframework.data.repository.CrudRepository;

public interface PraticanteCrud extends CrudRepository<Praticante,Integer> {
    public Praticante findByPratId(Integer pratId);
}

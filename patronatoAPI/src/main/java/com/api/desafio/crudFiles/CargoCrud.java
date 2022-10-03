package com.api.desafio.crudFiles;

import com.api.desafio.model.Cargo;
import org.springframework.data.repository.CrudRepository;

public interface CargoCrud extends CrudRepository<Cargo,Integer> {
}

package com.api.desafio.crudFiles;

import com.api.desafio.model.Material;
import org.springframework.data.repository.CrudRepository;

public interface MaterialCrud extends CrudRepository<Material,Integer> {
}

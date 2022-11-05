package com.api.desafio.crudFiles;

import com.api.desafio.model.Picadeiro;
import org.springframework.data.repository.CrudRepository;

public interface PicadeiroCrud extends CrudRepository<Picadeiro,Integer> {
}

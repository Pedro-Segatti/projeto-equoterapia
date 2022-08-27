package com.api.desafio.service;

import com.api.desafio.model.Animal;
import org.springframework.data.repository.CrudRepository;

public interface AnimalCrud extends CrudRepository<Animal,Integer> {
}

package com.api.desafio.service;

import com.api.desafio.model.Animal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnimalPesquisa extends JpaRepository<Animal, Integer> {

    Animal findByAniNomeLike(String nome);
    Animal findByAniPorteLikeIgnoreCase(String porte);
}

package com.api.desafio.service;

import com.api.desafio.model.Animal;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface AnimalCrud extends CrudRepository<Animal,Integer> {
    Animal findByAniNomeLike(String nome);

    @Query("SELECT a FROM Animal a WHERE a.aniNome = :aniNome AND (:aniPorte is null or  a.aniPorte = :aniPorte)")
    Animal findByNomeAndPorte(@Param("aniNome") String nome, @Param("aniPorte") String porte);
}

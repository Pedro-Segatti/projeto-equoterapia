package com.api.desafio.crudFiles;

import com.api.desafio.model.Animal;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AnimalCrud extends CrudRepository<Animal,Integer> {
    Animal findByAniNomeLike(String nome);

    @Query("SELECT a FROM Animal a WHERE (:aniId is null or a.aniId = :aniId) AND (:aniNome is null or :aniNome = '' or  a.aniNome like :aniNome)")
    List<Animal> findByIdAndNome(@Param("aniId") Integer id, @Param("aniNome") String nome);
}

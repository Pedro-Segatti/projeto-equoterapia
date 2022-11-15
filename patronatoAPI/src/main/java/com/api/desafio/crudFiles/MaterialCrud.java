package com.api.desafio.crudFiles;

import com.api.desafio.model.Material;
import com.api.desafio.model.Picadeiro;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MaterialCrud extends CrudRepository<Material,Integer> {

    @Query("SELECT m FROM Material m WHERE (:matId is null or m.matId = :matId)" +
            "AND (:matDescricao is null or :matDescricao = '' or m.matDescricao like %:matDescricao%)")
    List<Material> findByIdAndDescricao(@Param("matId")  Integer matId, @Param("matDescricao") String matDescricao);
}

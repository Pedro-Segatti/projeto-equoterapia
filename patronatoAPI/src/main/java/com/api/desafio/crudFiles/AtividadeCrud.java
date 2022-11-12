package com.api.desafio.crudFiles;

import com.api.desafio.model.Animal;
import com.api.desafio.model.Atividade;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AtividadeCrud extends CrudRepository<Atividade,Integer> {

    @Query("SELECT a FROM Atividade a WHERE (:atvId is null or a.atvId = :atvId) AND (:atvDescricao is null or :atvDescricao = '' or  a.atvDescricao like %:atvDescricao%)")
    List<Atividade> findByIdAndDescricao(@Param("atvId") Integer id, @Param("atvDescricao") String nome);
}

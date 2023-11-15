package com.api.desafio.crudFiles;

import com.api.desafio.model.Atividade;
import com.api.desafio.model.Montaria;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MontariaCrud extends CrudRepository<Montaria,Integer> {

    @Query("SELECT m FROM Montaria m WHERE (:montId is null or m.montId = :montId) AND (:montDescricao is null or :montDescricao = '' or  m.montDescricao like %:montDescricao%)")
    List<Montaria> findByIdAndDescricao(@Param("montId") Integer id, @Param("montDescricao") String nome);
}

package com.api.desafio.crudFiles;

import com.api.desafio.model.Bairro;
import com.api.desafio.model.Cidade;
import com.api.desafio.model.Logradouro;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CidadeCrud extends CrudRepository<Cidade,Integer> {

    Cidade findCidadeByCidId(Integer cidId);
    @Query("SELECT c FROM Cidade c WHERE (:cidNome is null or :cidNome = '' or c.cidNome like %:cidNome%) AND (:cidId IS NULL OR :cidId = c.cidId)")
    List<Cidade> findCidadeByCidNomeAndId(@Param("cidNome") String cidNome, @Param("cidId") Integer cidId);
}

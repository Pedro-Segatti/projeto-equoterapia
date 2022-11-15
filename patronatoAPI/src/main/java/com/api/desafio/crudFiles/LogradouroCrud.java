package com.api.desafio.crudFiles;

import com.api.desafio.model.Animal;
import com.api.desafio.model.Logradouro;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LogradouroCrud extends CrudRepository<Logradouro,Integer> {
    Logradouro findLogradouroByLogId(Integer logId);
    @Query("SELECT l FROM Logradouro l WHERE (:logDescricao is null or :logDescricao = '' or l.logDescricao like %:logDescricao%)")
    List<Logradouro> findLogradouroByLogDescricao(@Param("logDescricao")  String logDescricao);
}

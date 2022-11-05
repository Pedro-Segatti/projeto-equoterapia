package com.api.desafio.crudFiles;

import com.api.desafio.model.Animal;
import com.api.desafio.model.Logradouro;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LogradouroCrud extends CrudRepository<Logradouro,Integer> {
    Logradouro findLogradouroByLogId(Integer logId);
}

package com.api.desafio.crudFiles;

import com.api.desafio.model.Configuracoes;
import com.api.desafio.model.Funcionario;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface ConfiguracoesCrud extends CrudRepository<Configuracoes,Integer> {

    public Configuracoes findByConfId(Integer confId);
}

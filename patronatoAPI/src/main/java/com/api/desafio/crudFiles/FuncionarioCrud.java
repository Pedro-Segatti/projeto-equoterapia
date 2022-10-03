package com.api.desafio.crudFiles;

import com.api.desafio.model.Funcionario;
import org.springframework.data.repository.CrudRepository;

public interface FuncionarioCrud extends CrudRepository<Funcionario,Integer> {
}

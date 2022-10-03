package com.api.desafio.crudFiles;

import com.api.desafio.model.Agendamento;
import org.springframework.data.repository.CrudRepository;

public interface AgendamentoCrud extends CrudRepository<Agendamento,Integer> {
}

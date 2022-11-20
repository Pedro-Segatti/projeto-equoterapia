package com.api.desafio.crudFiles;

import com.api.desafio.model.Telefone;
import org.springframework.data.repository.CrudRepository;

public interface TelefoneCrud extends CrudRepository<Telefone,Integer> {
    public Telefone findTelefoneByTelId(Integer telid);
}

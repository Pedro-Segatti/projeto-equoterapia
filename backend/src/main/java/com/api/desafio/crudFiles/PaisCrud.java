package com.api.desafio.crudFiles;

import com.api.desafio.model.Animal;
import com.api.desafio.model.Pais;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PaisCrud extends CrudRepository<Pais,String> {

    public Pais findByPaiIso(String paiIso);
}

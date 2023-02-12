package com.api.desafio.crudFiles;

import com.api.desafio.model.Bairro;
import com.api.desafio.model.Cargo;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BairroCrud extends CrudRepository<Bairro,Integer> {

    @Query("SELECT b FROM Bairro b WHERE (:barNome is null or :barNome = '' or b.barNome like %:barNome%) AND (:barId is null OR b.barId = :barId)")
    List<Bairro> findBairroByNomeAndId(@Param("barNome")  String barNome, @Param("barId")  Integer barId);
}

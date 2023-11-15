package com.api.desafio.crudFiles;

import com.api.desafio.model.Logradouro;
import com.api.desafio.model.Picadeiro;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PicadeiroCrud extends CrudRepository<Picadeiro,Integer> {

    @Query("SELECT p FROM Picadeiro p WHERE (:picId is null or p.picId = :picId)" +
            "AND (:picDescricao is null or :picDescricao = '' or p.picDescricao like %:picDescricao%)")
    List<Picadeiro> findByIdAndDescricao(@Param("picId")  Integer picId, @Param("picDescricao") String picDescricao);
}

package com.api.desafio.crudFiles;

import com.api.desafio.model.Cargo;
import com.api.desafio.model.Picadeiro;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CargoCrud extends CrudRepository<Cargo,Integer> {

    @Query("SELECT c FROM Cargo c WHERE (:carId is null or c.carId = :carId)" +
            "AND (:carDescricao is null or :carDescricao = '' or c.carDescricao like %:carDescricao%)")
    List<Cargo> findByIdAndDescricao(@Param("carId")  Integer carId, @Param("carDescricao") String carDescricao);
}

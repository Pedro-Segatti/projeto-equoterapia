package com.api.desafio.crudFiles;

import com.api.desafio.model.FichaAnamnese;
import com.api.desafio.model.FichaEvolucao;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface FichaAnamneseCrud extends CrudRepository<FichaAnamnese,Integer> {

    @Query("SELECT f FROM FichaAnamnese f WHERE (:amnId is null or f.amnId = :amnId) AND (:amnData is null OR f.amnData = :amnData) AND (:pratId is null or f.amnIdPraticante.pratId = :pratId)")
    List<FichaAnamnese> findByIdAndData(@Param("amnId") Integer amnId, @Param("amnData") Date amnData, @Param("pratId") Integer pratId);

}

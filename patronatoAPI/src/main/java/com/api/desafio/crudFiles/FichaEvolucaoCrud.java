package com.api.desafio.crudFiles;

import com.api.desafio.model.Agendamento;
import com.api.desafio.model.Animal;
import com.api.desafio.model.FichaEvolucao;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface FichaEvolucaoCrud extends CrudRepository<FichaEvolucao,Integer> {

    @Query("SELECT f FROM FichaEvolucao f WHERE (:dataIni is null or f.evolData >= :dataIni) AND (:dataFim is null or f.evolData <= :dataFim) AND (:pratId is null or f.evolIdPraticante.pratId = :pratId)")
    List<FichaEvolucao> findByPeriodo(@Param("dataIni") Date dataIni, @Param("dataFim") Date dataFim, @Param("pratId") Integer pratId);

    @Query("SELECT f FROM FichaEvolucao f WHERE (:evolId is null or f.evolId = :evolId) AND (:evolData is null OR f.evolData = :evolData) AND (:pratId is null or f.evolIdPraticante.pratId = :pratId)")
    List<FichaEvolucao> findByIdAndData(@Param("evolId") Integer evolId, @Param("evolData") Date evolData, @Param("pratId") Integer pratId);

}

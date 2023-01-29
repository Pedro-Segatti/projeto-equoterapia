package com.api.desafio.crudFiles;

import com.api.desafio.model.Agendamento;
import com.api.desafio.model.Praticante;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface AgendamentoCrud extends CrudRepository<Agendamento,Integer> {

    public Agendamento findByAgdId(Integer agdId);
    @Query("SELECT a FROM Agendamento a WHERE (:pratId is null or a.praticante.pratId = :pratId) AND (:agdData is null OR a.agdData = :agdData)")
    List<Agendamento> findByPratIdAndAgdData(@Param("pratId") Integer pratId, @Param("agdData") Date agdData);

    @Query("SELECT a FROM Agendamento a WHERE a.agdData >= current_date and a.agdConcluido = false order by a.agdData, a.agdHora desc")
    List<Agendamento> findAtivos();
}

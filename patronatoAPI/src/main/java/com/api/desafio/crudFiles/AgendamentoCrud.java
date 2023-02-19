package com.api.desafio.crudFiles;

import com.api.desafio.model.*;
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

    @Query(value="SELECT * FROM AGENDAMENTO AGD " +
            "WHERE AGD.AGD_DATA = :agdData AND AGD.AGD_HORA = :agdHora AND AGD.AGD_ID <> :agdDifDe AND AGD.AGD_CONCLUIDO = FALSE " +
            "AND EXISTS (SELECT * FROM AGENDAMENTO_ANIMAL AA WHERE AA.AXA_ID_AGENDAMENTO = AGD.AGD_ID AND AA.AXA_ID_ANIMAL IN (:animalList));", nativeQuery = true)
    List<Agendamento> findAgendamentosByAgdDataAndAgdHoraAndExistsAnimal(@Param("agdData") Date agdData, @Param("agdHora") Date agdHora, @Param("agdDifDe") Integer agdDifDe, @Param("animalList") List<Animal> animalList);

    @Query(value="SELECT * FROM AGENDAMENTO AGD " +
            "WHERE AGD.AGD_DATA = :agdData AND AGD.AGD_HORA = :agdHora AND AGD.AGD_ID <> :agdDifDe AND AGD.AGD_CONCLUIDO = FALSE " +
            "AND EXISTS (SELECT * FROM AGENDAMENTO_FUNCIONARIO AF WHERE AF.AXF_ID_AGENDAMENTO = AGD.AGD_ID AND AF.AXF_ID_FUNCIONARIO IN (:funcionarioList));", nativeQuery = true)
    List<Agendamento> findAgendamentosByAgdDataAndAgdHoraAndExistsFuncionario(@Param("agdData") Date agdData, @Param("agdHora") Date agdHora, @Param("agdDifDe") Integer agdDifDe, @Param("funcionarioList") List<Funcionario> funcionarioList);

    @Query(value="SELECT * FROM AGENDAMENTO AGD " +
            "WHERE AGD.AGD_DATA = :agdData AND AGD.AGD_HORA = :agdHora AND AGD.AGD_ID <> :agdDifDe AND AGD.AGD_CONCLUIDO = FALSE " +
            "AND EXISTS (SELECT * FROM AGENDAMENTO_MATERIAL AM WHERE AM.AXM_ID_AGENDAMENTO = AGD.AGD_ID AND AM.AXM_ID_MATERIAL IN (:materialList));", nativeQuery = true)
    List<Agendamento> findAgendamentosByAgdDataAndAgdHoraAndExistsMaterial(@Param("agdData") Date agdData, @Param("agdHora") Date agdHora, @Param("agdDifDe") Integer agdDifDe, @Param("materialList") List<Material> materialList);
}

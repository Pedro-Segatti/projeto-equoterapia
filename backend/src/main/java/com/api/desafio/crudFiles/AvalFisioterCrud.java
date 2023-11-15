package com.api.desafio.crudFiles;

import com.api.desafio.model.*;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface AvalFisioterCrud extends CrudRepository<AvalFisioter,Integer> {

    @Query("SELECT a FROM AvalFisioter a WHERE (:praticante is null or a.aftIdPraticante.pratId = :praticante) AND (:medico is null or  a.aftIdMedico.medId = :medico) AND (:funcionario is null or a.aftIdFuncionario.funcId = :funcionario) AND (:data is null or a.aftData = :data)")
    List<AvalFisioter> findByPratAndMedAndFuncAndData(@Param("praticante") Integer praticante, @Param("medico") Integer medico, @Param("funcionario")Integer funcionario, Date data);
}

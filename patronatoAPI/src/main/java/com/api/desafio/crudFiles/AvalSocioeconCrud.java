package com.api.desafio.crudFiles;

import com.api.desafio.model.AvalFisioter;
import com.api.desafio.model.AvalSocioecon;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface AvalSocioeconCrud extends CrudRepository<AvalSocioecon,Integer> {

    @Query("SELECT a FROM AvalSocioecon a WHERE (:praticante is null or a.praticante.pratId = :praticante) AND (:data is null or a.aseData = :data)")
    List<AvalSocioecon> findByPratAndData(@Param("praticante") Integer praticante, Date data);
}

package com.api.desafio.crudFiles;

import com.api.desafio.model.Animal;
import com.api.desafio.model.Praticante;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PraticanteCrud extends CrudRepository<Praticante,Integer> {
    public Praticante findByPratId(Integer pratId);

    @Query("SELECT p FROM Praticante p WHERE (:pesCpf is null or :pesCpf = '' or p.pessoa.pesCpf = :pesCpf) AND (:pesNome is null OR :pesNome = ''  OR p.pessoa.pesNome LIKE %:pesNome%) AND (:pratId is null or p.pratId = :pratId)")
    List<Praticante> findByCpfAndNomeAndId(@Param("pesCpf") String pesCpf, @Param("pesNome") String pesNome, @Param("pratId") Integer pratId);
}

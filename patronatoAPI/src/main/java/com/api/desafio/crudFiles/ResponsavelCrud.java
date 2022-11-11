package com.api.desafio.crudFiles;

import com.api.desafio.model.Praticante;
import com.api.desafio.model.Responsavel;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ResponsavelCrud extends CrudRepository<Responsavel,Integer> {

    @Query("SELECT r FROM Responsavel r WHERE (:pesCpf is null or :pesCpf = '' or r.pessoa.pesCpf = :pesCpf) AND (:pesNome is null OR :pesNome = ''  OR r.pessoa.pesNome LIKE %:pesNome%)")
    List<Responsavel> findByCpfAndNome(@Param("pesCpf") String pesCpf, @Param("pesNome") String pesNome);
}

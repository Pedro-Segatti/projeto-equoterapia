package com.api.desafio.crudFiles;

import com.api.desafio.model.Responsavel;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ResponsavelCrud extends CrudRepository<Responsavel,Integer> {

    public Responsavel findByRespId(Integer respId);

    @Query("SELECT r FROM Responsavel r WHERE (:pesCpf is null or :pesCpf = '' or r.pessoa.pesCpf = :pesCpf) AND (:pesNome is null OR :pesNome = ''  OR r.pessoa.pesNome LIKE %:pesNome%) AND (:respId is null OR r.respId = :respId)")
    List<Responsavel> findByCpfAndNomeAndId(@Param("pesCpf") String pesCpf, @Param("pesNome") String pesNome, @Param("respId") Integer respId);
}

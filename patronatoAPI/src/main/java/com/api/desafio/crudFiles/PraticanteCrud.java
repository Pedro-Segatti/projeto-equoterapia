package com.api.desafio.crudFiles;

import com.api.desafio.model.Animal;
import com.api.desafio.model.Praticante;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PraticanteCrud extends CrudRepository<Praticante,Integer> {
    public Praticante findByPratId(Integer pratId);

    @Query("SELECT p FROM Praticante p WHERE (p.pessoa.pesCpf = :pesCpf OR p.pessoa.pesCpf <> '') AND (p.pessoa.pesNome = '' OR p.pessoa.pesNome LIKE :pesNome)")
    List<Praticante> findByCpfAndNome(@Param("pesCpf") String pesCpf, @Param("pesNome") String pesNome);
}

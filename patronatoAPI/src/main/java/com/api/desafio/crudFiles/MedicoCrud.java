package com.api.desafio.crudFiles;

import com.api.desafio.model.Medico;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MedicoCrud extends CrudRepository<Medico,Integer> {


    public Medico findByMedId(Integer medId);

    @Query("SELECT m FROM Medico m WHERE (:pesCpf is null or :pesCpf = '' or m.pessoa.pesCpf LIKE %:pesCpf%) AND (:pesNome is null OR :pesNome = ''  OR m.pessoa.pesNome LIKE %:pesNome%)")
    List<Medico> findByCpfAndNome(@Param("pesCpf") String pesCpf, @Param("pesNome") String pesNome);

}

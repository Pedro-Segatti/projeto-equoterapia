package com.api.desafio.crudFiles;

import com.api.desafio.model.Funcionario;
import com.api.desafio.model.Responsavel;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FuncionarioCrud extends CrudRepository<Funcionario,Integer> {

    public Funcionario findByFuncId(Integer funcId);

    @Query("SELECT f FROM Funcionario f WHERE (:pesCpf is null or :pesCpf = '' or f.pessoa.pesCpf = :pesCpf) AND (:pesNome is null OR :pesNome = ''  OR f.pessoa.pesNome LIKE %:pesNome%)")
    List<Funcionario> findByCpfAndNome(@Param("pesCpf") String pesCpf, @Param("pesNome") String pesNome);
}

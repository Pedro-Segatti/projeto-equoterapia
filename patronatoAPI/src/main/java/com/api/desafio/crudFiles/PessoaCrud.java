package com.api.desafio.crudFiles;

import com.api.desafio.model.Pessoa;
import org.springframework.data.repository.CrudRepository;

public interface PessoaCrud extends CrudRepository<Pessoa,Integer> {
    Pessoa findPessoaByPesCpf(String cpf);
    Pessoa findPessoaByPesId(Integer id);
}

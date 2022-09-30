package com.api.desafio.service;

import com.api.desafio.model.Pessoa;
import org.springframework.data.repository.CrudRepository;

public interface PessoaCrud extends CrudRepository<Pessoa,Integer> {
    Pessoa findPessoaByPesCpf(String cpf);
}

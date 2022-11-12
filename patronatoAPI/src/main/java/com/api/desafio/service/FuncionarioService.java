package com.api.desafio.service;

import com.api.desafio.crudFiles.FuncionarioCrud;
import com.api.desafio.model.Funcionario;
import com.api.desafio.model.Responsavel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.List;

@Component
@Transactional
public class FuncionarioService {

    @Autowired
    private FuncionarioCrud fc;

    public ResponseEntity<List<Funcionario>> pesquisaFuncionario(String pesCpf, String pesNome) {
        List<Funcionario> responsavel = fc.findByCpfAndNome(pesCpf, pesNome);
        return new ResponseEntity<List<Funcionario>>(responsavel, HttpStatus.OK);
    }
}

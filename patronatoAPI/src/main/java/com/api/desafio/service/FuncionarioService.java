package com.api.desafio.service;

import com.api.desafio.crudFiles.FuncionarioCrud;
import com.api.desafio.crudFiles.PessoaCrud;
import com.api.desafio.model.Funcionario;
import com.api.desafio.model.Pessoa;
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

    @Autowired
    private PessoaCrud pessoaCrud;

    public Funcionario getFuncionarioById(Integer funcId){
        return fc.findByFuncId(funcId);
    }

    public Funcionario salva(Funcionario pat) {
        pat = fc.save(pat);
        return pat;
    }

    public ResponseEntity<List<Funcionario>> pesquisaFuncionario(String pesCpf, String pesNome, Integer funcId) {
        List<Funcionario> funcionario = fc.findByCpfAndNomeAndId(pesCpf, pesNome, funcId);
        return new ResponseEntity<List<Funcionario>>(funcionario, HttpStatus.OK);
    }

    public Funcionario remove(Integer funcId) {
        Funcionario funcionario = fc.findByFuncId(funcId);
        fc.delete(funcionario);

        Pessoa pessoa = funcionario.getPessoa();
        pessoaCrud.delete(pessoa);

        return funcionario;

    }
}


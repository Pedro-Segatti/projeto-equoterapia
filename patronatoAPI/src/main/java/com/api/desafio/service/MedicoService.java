package com.api.desafio.service;

import com.api.desafio.crudFiles.FuncionarioCrud;
import com.api.desafio.crudFiles.MedicoCrud;
import com.api.desafio.model.Funcionario;
import com.api.desafio.model.Medico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.List;

@Component
@Transactional
public class MedicoService {

    @Autowired
    private MedicoCrud mc;

    public ResponseEntity<List<Medico>> pesquisaMedico(String pesCpf, String pesNome) {
        List<Medico> responsavel = mc.findByCpfAndNome(pesCpf, pesNome);
        return new ResponseEntity<List<Medico>>(responsavel, HttpStatus.OK);
    }
}

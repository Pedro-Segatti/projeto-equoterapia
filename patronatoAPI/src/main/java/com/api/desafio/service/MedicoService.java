package com.api.desafio.service;

import com.api.desafio.crudFiles.FuncionarioCrud;
import com.api.desafio.crudFiles.MedicoCrud;
import com.api.desafio.crudFiles.PessoaCrud;
import com.api.desafio.model.Funcionario;
import com.api.desafio.model.Medico;
import com.api.desafio.model.Pessoa;
import com.api.desafio.model.Praticante;
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
    @Autowired
    private PessoaCrud pessoaCrud;

    public Medico salva(Medico med) {
        med = mc.save(med);
        return med;
    }
    public ResponseEntity<List<Medico>> pesquisaMedico(String pesCpf, String pesNome) {
        List<Medico> medicos = mc.findByCpfAndNome(pesCpf, pesNome);
        return new ResponseEntity<List<Medico>>(medicos, HttpStatus.OK);
    }

    public void remove(Integer medId) {
        try{
            Medico medico = mc.findByMedId(medId);
            mc.delete(medico);

            Pessoa pessoa = medico.getPessoa();
            pessoaCrud.delete(pessoa);
        }catch(Exception e){
            e.printStackTrace();
        }
    }
}

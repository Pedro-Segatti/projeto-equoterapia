package com.api.desafio.service;

import com.api.desafio.crudFiles.PessoaCrud;
import com.api.desafio.crudFiles.PraticanteCrud;
import com.api.desafio.model.AvalSocioecon;
import com.api.desafio.model.Pessoa;
import com.api.desafio.model.Praticante;
import com.api.desafio.model.ResponseModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.sql.SQLException;
import java.util.List;

@Component
@Transactional
public class PraticanteService {

    @Autowired
    private PraticanteCrud praticanteCrud;
    @Autowired
    private PessoaCrud pessoaCrud;

    public Praticante getPraticanteById(Integer pratId){
        return praticanteCrud.findByPratId(pratId);
    }

    public Praticante salva(Praticante pat) {
        pat = praticanteCrud.save(pat);
        return pat;
    }

    public ResponseEntity<List<Praticante>> pesquisaPraticantes(String pesCpf, String pesNome) {
        List<Praticante> praticantes = praticanteCrud.findByCpfAndNome(pesCpf, pesNome);
        return new ResponseEntity<List<Praticante>>(praticantes, HttpStatus.OK);
    }

    public void remove(Integer pratId) {
        try{
            Praticante praticante = praticanteCrud.findByPratId(pratId);
            praticanteCrud.delete(praticante);

            Pessoa pessoa = praticante.getPessoa();
            pessoaCrud.delete(pessoa);
        }catch(Exception e){
            e.printStackTrace();
        }

    }
}

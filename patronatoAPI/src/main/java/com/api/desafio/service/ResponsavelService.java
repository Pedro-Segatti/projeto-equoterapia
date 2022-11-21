package com.api.desafio.service;

import com.api.desafio.crudFiles.PessoaCrud;
import com.api.desafio.crudFiles.ResponsavelCrud;
import com.api.desafio.model.Pessoa;
import com.api.desafio.model.Responsavel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.List;

@Component
@Transactional
public class ResponsavelService {

    @Autowired
    private ResponsavelCrud rc;
    @Autowired
    private PessoaCrud pessoaCrud;

    public Responsavel getResponsavelById(Integer respId){
        return rc.findByRespId(respId);
    }

    public Responsavel salva(Responsavel pat) {
        pat = rc.save(pat);
        return pat;
    }

    public ResponseEntity<List<Responsavel>> pesquisaResponsavel(String pesCpf, String pesNome) {
        List<Responsavel> responsavel = rc.findByCpfAndNome(pesCpf, pesNome);
        return new ResponseEntity<List<Responsavel>>(responsavel, HttpStatus.OK);
    }

    public Responsavel remove(Integer respId) {
            Responsavel responsavel = rc.findByRespId(respId);
            rc.delete(responsavel);

            Pessoa pessoa = responsavel.getPessoa();
            pessoaCrud.delete(pessoa);

            return responsavel;

    }
}

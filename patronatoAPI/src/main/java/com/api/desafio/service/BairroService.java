package com.api.desafio.service;

import com.api.desafio.crudFiles.BairroCrud;
import com.api.desafio.crudFiles.CargoCrud;
import com.api.desafio.model.Bairro;
import com.api.desafio.model.Cargo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.List;

@Component
@Transactional
public class BairroService {

    @Autowired
    private BairroCrud bc;

    public ResponseEntity<?> salva(Bairro bairro) {
        bc.save(bairro);
        return new ResponseEntity<Bairro>(bairro, HttpStatus.OK);
    }

    public Bairro remove(Integer barId) {
        Bairro bairro = bc.findById(barId).orElse(null);
        bc.delete(bairro);
        return bairro;
    }

    public ResponseEntity<List<Bairro>> pesquisa(String barNome, Integer barId) {
        List<Bairro> bairros = (List<Bairro>) bc.findBairroByNomeAndId(barNome, barId);
        return new ResponseEntity<List<Bairro>>(bairros, HttpStatus.OK);
    }
}

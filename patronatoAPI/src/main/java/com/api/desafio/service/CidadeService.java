package com.api.desafio.service;

import com.api.desafio.crudFiles.BairroCrud;
import com.api.desafio.crudFiles.CidadeCrud;
import com.api.desafio.model.Bairro;
import com.api.desafio.model.Cidade;
import com.api.desafio.model.Logradouro;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.List;

@Component
@Transactional
public class CidadeService {

    @Autowired
    private CidadeCrud cc;

    public Cidade getCidadeById(Integer cidId){
        return cc.findCidadeByCidId(cidId);
    }

    public List<Cidade> getCidadeByNomeAndId(String cidNome, Integer cidId){
        return cc.findCidadeByCidNomeAndId(cidNome, cidId);
    }

    public ResponseEntity<List<Cidade>> pesquisa(String cidNome, Integer cidId) {
        List<Cidade> cidade = (List<Cidade>) cc.findCidadeByCidNomeAndId(cidNome, cidId);
        return new ResponseEntity<List<Cidade>>(cidade, HttpStatus.OK);
    }

}

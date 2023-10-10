package com.api.desafio.service;

import com.api.desafio.crudFiles.ConfiguracoesCrud;
import java.util.List;
import java.util.Optional;

import com.api.desafio.model.Animal;
import com.api.desafio.model.Configuracoes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

@Component
@Transactional
public class ConfiguracoesService {
    @Autowired
    private ConfiguracoesCrud configuracoesCrud;

    public ResponseEntity<?> salva(Configuracoes configuracoes) {
        configuracoesCrud.save(configuracoes);
        return new ResponseEntity<Configuracoes>(configuracoes, HttpStatus.OK);
    }

    public Configuracoes remove(Integer confId) {
        Configuracoes configuracoes = configuracoesCrud.findById(confId).orElse(null);
        configuracoesCrud.delete(configuracoes);
        return configuracoes;
    }

    public ResponseEntity<Configuracoes> pesquisaConfiguracoes(Integer confId) {
        Optional<Configuracoes> configuracoes = configuracoesCrud.findById(confId);
        return new ResponseEntity<>(configuracoes.get(), HttpStatus.OK);
    }

    public Configuracoes getConfiguracoes() {
        Optional<Configuracoes> configuracoes = configuracoesCrud.findById(1);
        return configuracoes.get();
    }
}

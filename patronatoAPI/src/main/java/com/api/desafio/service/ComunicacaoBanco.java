package com.api.desafio.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.api.desafio.model.ResponseModel;

@Service
public class ComunicacaoBanco {

    @Autowired
    private ResponseModel rm;

    public ResponseEntity<?> buscar(Integer id){
        rm.setMensagem(null);
        rm.setOcorrencias("Funciona");
        return new ResponseEntity<ResponseModel>(rm, HttpStatus.OK);
    }

}

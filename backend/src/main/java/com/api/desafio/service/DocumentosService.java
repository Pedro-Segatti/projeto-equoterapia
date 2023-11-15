package com.api.desafio.service;

import com.api.desafio.crudFiles.DocumentosCrud;
import com.api.desafio.model.Documentos;
import com.api.desafio.model.Pessoa;
import com.api.desafio.model.Praticante;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

@Component
@Transactional
public class DocumentosService {

    @Autowired
    private DocumentosCrud dc;

    public void remove(Integer docId) {
        try{
            Documentos doc = dc.findDocumentosByDocId(docId);
            dc.delete(doc);
        }catch(Exception e){
            e.printStackTrace();
        }

    }
}

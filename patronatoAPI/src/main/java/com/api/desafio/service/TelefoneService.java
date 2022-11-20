package com.api.desafio.service;

import com.api.desafio.crudFiles.TelefoneCrud;
import com.api.desafio.model.Pessoa;
import com.api.desafio.model.Praticante;
import com.api.desafio.model.Telefone;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

@Component
@Transactional
public class TelefoneService {

    @Autowired
    private TelefoneCrud telefoneCrud;

    public void remove(Integer telid) {
        try{
            Telefone telefone = telefoneCrud.findTelefoneByTelId(telid);
            telefoneCrud.delete(telefone);
        }catch(Exception e){
            e.printStackTrace();
        }
    }
}

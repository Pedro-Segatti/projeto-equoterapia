package com.api.desafio.service;

import com.api.desafio.crudFiles.MaterialCrud;
import com.api.desafio.crudFiles.MontariaCrud;
import com.api.desafio.model.Material;
import com.api.desafio.model.Montaria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.List;

@Component
@Transactional
public class MontariaService {

    @Autowired
    private MontariaCrud mc;

    public ResponseEntity<?> salva(Montaria montaria) {
        mc.save(montaria);
        return new ResponseEntity<Montaria>(montaria, HttpStatus.OK);
    }

    public ResponseEntity<?> remove(Integer montId) {
        Montaria montaria = mc.findById(montId).orElse(null);
        mc.delete(montaria);
        return new ResponseEntity<Montaria>(montaria, HttpStatus.OK);
    }

    public ResponseEntity<List<Montaria>> pesquisa() {
        List<Montaria> montaria = (List<Montaria>) mc.findAll();
        return new ResponseEntity<List<Montaria>>(montaria, HttpStatus.OK);
    }

}

package com.api.desafio.service;

import com.api.desafio.crudFiles.PicadeiroCrud;
import com.api.desafio.model.Picadeiro;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import javax.transaction.Transactional;
import java.util.List;

@Component
@Transactional
public class PicadeiroService {

    @Autowired
    private PicadeiroCrud pc;

    public ResponseEntity<?> salva(Picadeiro picadeiro) {
        pc.save(picadeiro);
        return new ResponseEntity<Picadeiro>(picadeiro, HttpStatus.OK);
    }

    public ResponseEntity<?> remove(Integer picId) {
        Picadeiro picadeiro = pc.findById(picId).orElse(null);
        pc.delete(picadeiro);
        return new ResponseEntity<Picadeiro>(picadeiro, HttpStatus.OK);
    }

    public ResponseEntity<List<Picadeiro>> pesquisa() {
        List<Picadeiro> picadeiro = (List<Picadeiro>) pc.findAll();
        return new ResponseEntity<List<Picadeiro>>(picadeiro, HttpStatus.OK);
    }
}

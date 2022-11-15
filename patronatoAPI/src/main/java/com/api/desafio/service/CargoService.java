package com.api.desafio.service;

import com.api.desafio.crudFiles.CargoCrud;
import com.api.desafio.model.Atividade;
import com.api.desafio.model.Cargo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.List;

@Component
@Transactional
public class CargoService {

    @Autowired
    private CargoCrud cc;

    public ResponseEntity<?> salva(Cargo cargo) {
        cc.save(cargo);
        return new ResponseEntity<Cargo>(cargo, HttpStatus.OK);
    }

    public ResponseEntity<?> remove(Integer carId) {
        Cargo cargo = cc.findById(carId).orElse(null);
        cc.delete(cargo);
        return new ResponseEntity<Cargo>(cargo, HttpStatus.OK);
    }

    public ResponseEntity<List<Cargo>> pesquisa(Integer carId, String carDescricao) {
        List<Cargo> cargos =  (List<Cargo>) cc.findByIdAndDescricao(carId,carDescricao);
        return new ResponseEntity<List<Cargo>>(cargos, HttpStatus.OK);
    }
}

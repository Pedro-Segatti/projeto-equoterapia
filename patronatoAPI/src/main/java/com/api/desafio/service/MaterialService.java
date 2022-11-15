package com.api.desafio.service;

import com.api.desafio.crudFiles.MaterialCrud;
import com.api.desafio.model.Atividade;
import com.api.desafio.model.Material;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.List;

@Component
@Transactional
public class MaterialService {

    @Autowired
    private MaterialCrud mc;

    public ResponseEntity<?> salva(Material material) {
        mc.save(material);
        return new ResponseEntity<Material>(material, HttpStatus.OK);
    }

    public ResponseEntity<?> remove(Integer matId) {
        Material material = mc.findById(matId).orElse(null);
        mc.delete(material);
        return new ResponseEntity<Material>(material, HttpStatus.OK);
    }

    public ResponseEntity<List<Material>> pesquisa(Integer matId, String matDescricao) {
        List<Material> material = mc.findByIdAndDescricao(matId,matDescricao);
        return new ResponseEntity<List<Material>>(material, HttpStatus.OK);
    }

}

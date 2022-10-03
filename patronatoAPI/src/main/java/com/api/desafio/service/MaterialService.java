package com.api.desafio.service;

import com.api.desafio.crudFiles.MaterialCrud;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

@Component
@Transactional
public class MaterialService {

    @Autowired
    private MaterialCrud mc;
}

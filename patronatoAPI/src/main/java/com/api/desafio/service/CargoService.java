package com.api.desafio.service;

import com.api.desafio.crudFiles.CargoCrud;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

@Component
@Transactional
public class CargoService {

    @Autowired
    private CargoCrud cc;
}

package com.api.desafio.service;

import com.api.desafio.crudFiles.ResponsavelCrud;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

@Component
@Transactional
public class ResponsavelService {

    @Autowired
    private ResponsavelCrud rc;
}

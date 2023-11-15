package com.api.desafio.service;

import com.api.desafio.crudFiles.DocumentosCrud;
import com.api.desafio.crudFiles.PraticanteResponsavelCrud;
import com.api.desafio.model.Documentos;
import com.api.desafio.model.PraticanteResponsavel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

@Component
@Transactional
public class PraticanteResponsavelService {

    @Autowired
    private PraticanteResponsavelCrud praticanteResponsavelCrud;

    public void remove(Integer pxrId) {
        try{
            PraticanteResponsavel pxr = praticanteResponsavelCrud.findPraticanteResponsavelByPxrId(pxrId);
            praticanteResponsavelCrud.delete(pxr);
        }catch(Exception e){
            e.printStackTrace();
        }

    }
}

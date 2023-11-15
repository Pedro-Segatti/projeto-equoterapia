package com.api.desafio.crudFiles;

import com.api.desafio.model.Documentos;
import com.api.desafio.model.PraticanteResponsavel;
import org.springframework.data.repository.CrudRepository;

public interface PraticanteResponsavelCrud extends CrudRepository<PraticanteResponsavel,Integer> {

    public PraticanteResponsavel findPraticanteResponsavelByPxrId(Integer pxrId);
}

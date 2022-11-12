package com.api.desafio.crudFiles;

import com.api.desafio.model.Documentos;
import org.springframework.data.repository.CrudRepository;

public interface DocumentosCrud extends CrudRepository<Documentos,Integer> {

    public Documentos findDocumentosByDocId(Integer docId);
}

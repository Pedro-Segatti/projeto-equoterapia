package com.api.desafio.service;

import com.api.desafio.crudFiles.PessoaCrud;
import com.api.desafio.model.Logradouro;
import com.api.desafio.model.Pais;
import com.api.desafio.model.Pessoa;
import com.api.desafio.utils.StringUtil;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Component
@Transactional
public class PessoaService {

    @Autowired
    private PessoaCrud pessoaCrud;

    public Pessoa getPessoaByPesCpf(String filtroCpf) {
        return pessoaCrud.findPessoaByPesCpf(filtroCpf);
    }

    public Pessoa getPessoaByPesId(Integer pesId){
        return pessoaCrud.findPessoaByPesId(pesId);
    }

    public Pessoa salva(Pessoa pes) {
        pes = pessoaCrud.save(pes);
        return pes;
    }
}

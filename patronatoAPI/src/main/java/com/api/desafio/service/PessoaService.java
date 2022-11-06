package com.api.desafio.service;

import com.api.desafio.crudFiles.PessoaCrud;
import com.api.desafio.model.*;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    public Pessoa manipularPessoa(JsonObject jsonConvertido, Pessoa pessoa, Logradouro logradouro, Pais pais) {
        pessoa.setPesNome(jsonConvertido.get("pesNome").getAsString());
        pessoa.setPesCpf(jsonConvertido.get("pesCpf").getAsString());
        pessoa.setPesEmail1(jsonConvertido.get("pesEmail1").getAsString());

        JsonElement pesEmailS = jsonConvertido.get("pesEmail2");
        if(!pesEmailS.isJsonNull()){
            pessoa.setPesEmail2(pesEmailS.getAsString());
        }

        pessoa.setPesSexo(jsonConvertido.get("pesSexo").getAsString());
        try {
            JsonElement pesDatanasc = jsonConvertido.get("pesDataNasc");
            Date dataNasc = new SimpleDateFormat("yyyy-MM-dd").parse(pesDatanasc.getAsString());
            pessoa.setPesDataNasc(dataNasc);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        pessoa.setPesEndNum(jsonConvertido.get("pesEndNum").getAsInt());
        pessoa.setPesEndCompl(jsonConvertido.get("pesEndCompl").getAsString());
        pessoa.setPesNacionalidade(pais);
        pessoa.setLogradouro(logradouro);
        pessoa.setPesFoto(jsonConvertido.get("pesFoto").getAsString());

        pessoa = salva(pessoa);
        return pessoa;
    }

}

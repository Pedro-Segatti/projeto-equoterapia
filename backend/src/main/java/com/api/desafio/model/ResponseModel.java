package com.api.desafio.model;

import org.springframework.stereotype.Component;

@Component
public class ResponseModel {
    private String mensagem;
    private String ocorrencias;

    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }

    public String getOcorrencias() {
        return ocorrencias;
    }

    public void setOcorrencias(String ocorrencias) {
        this.ocorrencias = ocorrencias;
    }

}

package com.api.desafio.utils;

import java.util.ArrayList;
import java.util.List;

public class Email {

    private List<String> destinatarios = new ArrayList<>();
    private String mensagem;
    private String assunto;
    private String anexo;

    public Email(List<String> destinatarios, String mensagem, String assunto, String anexo) {
        this.destinatarios = destinatarios;
        this.mensagem = mensagem;
        this.assunto = assunto;
        this.anexo = anexo;
    }

    public List<String> getDestinatarios() {
        return destinatarios;
    }

    public void setDestinatarios(List<String> destinatarios) {
        this.destinatarios = destinatarios;
    }

    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }

    public String getAssunto() {
        return assunto;
    }

    public void setAssunto(String assunto) {
        this.assunto = assunto;
    }

    public String getAnexo() {
        return anexo;
    }

    public void setAnexo(String anexo) {
        this.anexo = anexo;
    }
}

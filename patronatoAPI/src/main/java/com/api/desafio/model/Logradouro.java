package com.api.desafio.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name="LOGRADOURO")
public class Logradouro implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="LOG_ID")
    private Integer logId;
    @Column(name="LOG_DESCRICAO",length = 100)
    private String logDescricao;
    @Column(name="LOG_CEP")
    private Integer logCep;

    public Logradouro() {
    }

    public Integer getLogId() {
        return logId;
    }

    public void setLogId(Integer logId) {
        this.logId = logId;
    }

    public String getLogDescricao() {
        return logDescricao;
    }

    public void setLogDescricao(String logDescricao) {
        this.logDescricao = logDescricao;
    }

    public Integer getLogCep() {
        return logCep;
    }

    public void setLogCep(Integer logCep) {
        this.logCep = logCep;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Logradouro that = (Logradouro) o;
        return Objects.equals(logId, that.logId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(logId);
    }
}

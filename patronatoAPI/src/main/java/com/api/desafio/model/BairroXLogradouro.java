package com.api.desafio.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name="BAIRROXLOGRADOURO")
public class BairroXLogradouro implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="BXL_ID")
    private Integer barId;
    @JoinColumn(name = "BXL_ID_BAR",referencedColumnName = "BAR_ID")
    @ManyToOne(fetch = FetchType.LAZY)
    private Bairro bairro;
    @JoinColumn(name = "BXL_ID_LOG",referencedColumnName = "LOG_ID")
    @ManyToOne(fetch = FetchType.LAZY)
    private Logradouro logradouro;

    public BairroXLogradouro() {
    }

    public Integer getBarId() {
        return barId;
    }

    public void setBarId(Integer barId) {
        this.barId = barId;
    }

    public Bairro getBairro() {
        return bairro;
    }

    public void setBairro(Bairro bairro) {
        this.bairro = bairro;
    }

    public Logradouro getLogradouro() {
        return logradouro;
    }

    public void setLogradouro(Logradouro logradouro) {
        this.logradouro = logradouro;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BairroXLogradouro bairro = (BairroXLogradouro) o;
        return Objects.equals(barId, bairro.barId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(barId);
    }
}

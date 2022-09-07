package com.api.desafio.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name="PAIS")
public class Pais implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="PAI_ISO",length = 4)
    private String paiIso;
    @Column(name="PAI_NOME",length = 100)
    private String paiNome;

    public Pais() {
    }

    public String getPaiIso() {
        return paiIso;
    }

    public void setPaiIso(String paiIso) {
        this.paiIso = paiIso;
    }

    public String getPaiNome() {
        return paiNome;
    }

    public void setPaiNome(String paiNome) {
        this.paiNome = paiNome;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Pais pais = (Pais) o;
        return Objects.equals(paiIso, pais.paiIso) && Objects.equals(paiNome, pais.paiNome);
    }

    @Override
    public int hashCode() {
        return Objects.hash(paiIso, paiNome);
    }
}

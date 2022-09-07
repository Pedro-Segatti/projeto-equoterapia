package com.api.desafio.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name="ESTADO")
public class Estado implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="EST_UF",length = 3)
    private String estUf;
    @Column(name="EST_NOME",length = 100)
    private String estNome;
    @JoinColumn(name = "FK_PAIS_PAI_ISO",referencedColumnName = "PAI_ISO")
    @ManyToOne(fetch = FetchType.LAZY)
    private Pais pais;

    public Estado() {
    }

    public String getEstUf() {
        return estUf;
    }

    public void setEstUf(String estUf) {
        this.estUf = estUf;
    }

    public String getEstNome() {
        return estNome;
    }

    public void setEstNome(String estNome) {
        this.estNome = estNome;
    }

    public Pais getPais() {
        return pais;
    }

    public void setPais(Pais pais) {
        this.pais = pais;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Estado estado = (Estado) o;
        return Objects.equals(estUf, estado.estUf);
    }

    @Override
    public int hashCode() {
        return Objects.hash(estUf);
    }
}

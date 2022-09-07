package com.api.desafio.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name="CIDADE")
public class Cidade implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="CID_ID")
    private Integer cidId;
    @Column(name="CID_NOME",length = 100)
    private String cidNome;
    @JoinColumn(name = "FK_ESTADO_EST_UF", referencedColumnName = "EST_UF")
    @ManyToOne(fetch = FetchType.LAZY)
    private Estado estado;

    public Cidade() {
    }

    public Integer getCidId() {
        return cidId;
    }

    public void setCidId(Integer cidId) {
        this.cidId = cidId;
    }

    public String getCidNome() {
        return cidNome;
    }

    public void setCidNome(String cidNome) {
        this.cidNome = cidNome;
    }

    public Estado getEstado() {
        return estado;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Cidade cidade = (Cidade) o;
        return Objects.equals(cidId, cidade.cidId) && Objects.equals(cidNome, cidade.cidNome);
    }

    @Override
    public int hashCode() {
        return Objects.hash(cidId, cidNome);
    }
}

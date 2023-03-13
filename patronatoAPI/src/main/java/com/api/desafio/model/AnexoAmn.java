package com.api.desafio.model;

import com.api.desafio.service.FichaAnamneseService;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "ANEXO_AMN")

public class AnexoAmn implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "AAMN_ID")
    private Integer aamnId;

    @Basic(optional = false)
    @Column(name = "AAMN_DESCRICAO")
    private String aamnDescricao;

    @Basic(optional = false)
    @Column(name = "AAMN_EXAM_COMP")
    @Lob
    private String aamnExamComp;

    @JsonIgnore
    @JoinColumn(name = "AAMN_ID_FICHA_ANAMNESE", referencedColumnName = "AMN_ID")
    @ManyToOne(optional = false)
    private FichaAnamnese fichaAnamnese;

    public AnexoAmn() {
    }

    public Integer getAamnId() {
        return aamnId;
    }

    public void setAmnId(Integer aamnId) {
        this.aamnId = aamnId;
    }

    public String getAamnDescricao() {
        return aamnDescricao;
    }

    public void setAamnDescricao(String aamnDescricao) {
        this.aamnDescricao = aamnDescricao;
    }

    public String getAamnExamComp() {
        return aamnExamComp;
    }

    public void setAamnExamComp(String aamnExamComp) {
        this.aamnExamComp = aamnExamComp;
    }

    public FichaAnamnese getFichaAnamnese() {
        return fichaAnamnese;
    }

    public void setFichaAnamnese(FichaAnamnese fichaAnamnese) {
        this.fichaAnamnese = fichaAnamnese;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        com.api.desafio.model.AnexoAmn anexoAmn = (com.api.desafio.model.AnexoAmn) o;
        return Objects.equals(aamnId, anexoAmn.aamnId) && Objects.equals(aamnExamComp, anexoAmn.aamnExamComp) && Objects.equals(fichaAnamnese, anexoAmn.fichaAnamnese);
    }

    @Override
    public int hashCode() {
        return Objects.hash(aamnId, aamnExamComp, fichaAnamnese);
    }

    @Override
    public String toString() {
        return "AnexoAmn{" +
                "aamnId=" + aamnId +
                ", aamnExamComp='" + aamnExamComp + '\'' +
                ", fichaAnamnese=" + fichaAnamnese +
                '}';
    }
}

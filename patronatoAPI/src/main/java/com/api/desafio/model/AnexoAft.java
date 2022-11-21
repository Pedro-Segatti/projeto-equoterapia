package com.api.desafio.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "ANEXO_AFT")
public class AnexoAft implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "AAFT_ID")
    private Integer aaftId;
    @Basic(optional = false)
    @Column(name = "AAFT_DESCRICAO")
    private String aaftDescricao;
    @Basic(optional = false)
    @Column(name = "AAFT_EXAM_COMP")
    @Lob
    private String aaftExamComp;
    @JsonIgnore
    @JoinColumn(name = "AAFT_ID_AVAL_FISIO", referencedColumnName = "AFT_ID")
    @ManyToOne(optional = false)
    private AvalFisioter avalFisioter;

    public AnexoAft() {
    }

    public Integer getAaftId() {
        return aaftId;
    }

    public void setAaftId(Integer aaftId) {
        this.aaftId = aaftId;
    }

    public String getAaftDescricao() {
        return aaftDescricao;
    }

    public void setAaftDescricao(String aaftDescricao) {
        this.aaftDescricao = aaftDescricao;
    }

    public String getAaftExamComp() {
        return aaftExamComp;
    }

    public void setAaftExamComp(String aaftExamComp) {
        this.aaftExamComp = aaftExamComp;
    }

    public AvalFisioter getAvalFisioter() {
        return avalFisioter;
    }

    public void setAvalFisioter(AvalFisioter avalFisioter) {
        this.avalFisioter = avalFisioter;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AnexoAft anexoAft = (AnexoAft) o;
        return Objects.equals(aaftId, anexoAft.aaftId) && Objects.equals(aaftExamComp, anexoAft.aaftExamComp) && Objects.equals(avalFisioter, anexoAft.avalFisioter);
    }

    @Override
    public int hashCode() {
        return Objects.hash(aaftId, aaftExamComp, avalFisioter);
    }

    @Override
    public String toString() {
        return "AnexoAft{" +
                "aaftId=" + aaftId +
                ", aaftExamComp='" + aaftExamComp + '\'' +
                ", avalFisioter=" + avalFisioter +
                '}';
    }
}

package com.api.desafio.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Pedro
 */
@Entity
@Table(name = "PRATICANTE_RESPONSAVEL")
public class PraticanteResponsavel implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "PXR_ID")
    private Integer pxrId;
    @JoinColumn(name = "PXR_ID_PRAT", referencedColumnName = "PRAT_ID")
    @ManyToOne(optional = false)
    private Praticante praticante;
    @JoinColumn(name = "PXR_ID_RESP", referencedColumnName = "RESP_ID")
    @ManyToOne(optional = false)
    private Responsavel responsavel;
    @Column(name = "PXR_TIPO_RESP")
    private String pxrTipoResp;

    public PraticanteResponsavel() {
    }

    public Integer getPxrId() {
        return pxrId;
    }

    public void setPxrId(Integer pxrId) {
        this.pxrId = pxrId;
    }

    @JsonIgnore
    public Praticante getPraticante() {
        return praticante;
    }

    public void setPraticante(Praticante praticante) {
        this.praticante = praticante;
    }

    public Responsavel getResponsavel() {
        return responsavel;
    }

    public void setResponsavel(Responsavel responsavel) {
        this.responsavel = responsavel;
    }

    public String getPxrTipoResp() {
        return pxrTipoResp;
    }

    public void setPxrTipoResp(String pxrTipoResp) {
        this.pxrTipoResp = pxrTipoResp;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        PraticanteResponsavel that = (PraticanteResponsavel) o;

        if (!pxrId.equals(that.pxrId)) return false;
        if (!praticante.equals(that.praticante)) return false;
        return responsavel.equals(that.responsavel);
    }

    @Override
    public int hashCode() {
        int result = pxrId.hashCode();
        result = 31 * result + praticante.hashCode();
        result = 31 * result + responsavel.hashCode();
        return result;
    }
}

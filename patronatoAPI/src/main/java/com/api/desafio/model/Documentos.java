package com.api.desafio.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 *
 * @author Pedro
 */
@Entity
@Table(name = "DOCUMENTOS")
public class Documentos implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "DOC_ID")
    private Integer docId;
    @Basic(optional = false)
    @Column(name = "DOC_DESCRICAO")
    private String docDescricao;
    @Basic(optional = false)
    @Lob
    @Column(name = "DOC_DOCUMENTO")
    private String docDocumento;
    @JoinColumn(name = "DOC_ID_PRATICANTE", referencedColumnName = "PRAT_ID")
    @ManyToOne(optional = false)
    private Praticante praticante;

    public Documentos() {
    }

    public Documentos(Integer docId) {
        this.docId = docId;
    }

    public Documentos(Integer docId, String docDocumento) {
        this.docId = docId;
        this.docDocumento = docDocumento;
    }

    public Integer getDocId() {
        return docId;
    }

    public void setDocId(Integer docId) {
        this.docId = docId;
    }

    public String getDocDescricao() {
        return docDescricao;
    }

    public void setDocDescricao(String docDescricao) {
        this.docDescricao = docDescricao;
    }

    public String getDocDocumento() {
        return docDocumento;
    }

    public void setDocDocumento(String docDocumento) {
        this.docDocumento = docDocumento;
    }

    @JsonIgnore
    public Praticante getPraticante() {
        return praticante;
    }

    public void setPraticante(Praticante praticante) {
        this.praticante = praticante;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (docId != null ? docId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Documentos)) {
            return false;
        }
        Documentos other = (Documentos) object;
        if ((this.docId == null && other.docId != null) || (this.docId != null && !this.docId.equals(other.docId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.api.desafio.model.Documentos[ docId=" + docId + " ]";
    }

}

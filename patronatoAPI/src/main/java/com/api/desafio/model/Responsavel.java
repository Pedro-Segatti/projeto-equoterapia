package com.api.desafio.model;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 *
 * @author Pedro
 */
@Entity
@Table(name = "RESPONSAVEL")
public class Responsavel implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "RESP_ID")
    private Integer respId;
    @Basic(optional = false)
    @Column(name = "RESP_PROFISSAO")
    private String respProfissao;
    @ManyToMany(mappedBy = "responsavelList")
    private List<Praticante> praticanteList;
    @JoinColumn(name = "RESP_ID_PESSOA", referencedColumnName = "PES_ID")
    @ManyToOne(optional = false)
    private Pessoa pessoa;

    public Responsavel() {
    }

    public Responsavel(Integer respId) {
        this.respId = respId;
    }

    public Responsavel(Integer respId, String respProfissao) {
        this.respId = respId;
        this.respProfissao = respProfissao;
    }

    public Integer getRespId() {
        return respId;
    }

    public void setRespId(Integer respId) {
        this.respId = respId;
    }

    public String getRespProfissao() {
        return respProfissao;
    }

    public void setRespProfissao(String respProfissao) {
        this.respProfissao = respProfissao;
    }

    public List<Praticante> getPraticanteList() {
        return praticanteList;
    }

    public void setPraticanteList(List<Praticante> praticanteList) {
        this.praticanteList = praticanteList;
    }

    public Pessoa getPessoa() {
        return pessoa;
    }

    public void setPessoa(Pessoa pessoa) {
        this.pessoa = pessoa;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (respId != null ? respId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Responsavel)) {
            return false;
        }
        Responsavel other = (Responsavel) object;
        if ((this.respId == null && other.respId != null) || (this.respId != null && !this.respId.equals(other.respId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.api.desafio.model.Responsavel[ respId=" + respId + " ]";
    }

}

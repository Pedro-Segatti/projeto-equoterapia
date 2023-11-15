package com.api.desafio.model;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 *
 * @author Pedro
 */
@Entity
@Table(name = "LOGRADOURO")
public class Logradouro implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "LOG_ID")
    private Integer logId;
    @Basic(optional = false)
    @Column(name = "LOG_DESCRICAO")
    private String logDescricao;
    @Basic(optional = false)
    @Column(name = "LOG_CEP")
    private String logCep;
    @JoinColumn(name = "LOG_ID_BAI", referencedColumnName = "BAR_ID")
    @ManyToOne(optional = false)
    private Bairro bairro;

    public Logradouro() {
    }

    public Logradouro(Integer logId) {
        this.logId = logId;
    }

    public Logradouro(Integer logId, String logDescricao, String logCep) {
        this.logId = logId;
        this.logDescricao = logDescricao;
        this.logCep = logCep;
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

    public String getLogCep() {
        return logCep;
    }

    public void setLogCep(String logCep) {
        this.logCep = logCep;
    }

    public Bairro getBairro() {
        return bairro;
    }

    public void setBairro(Bairro bairro) {
        this.bairro = bairro;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (logId != null ? logId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Logradouro)) {
            return false;
        }
        Logradouro other = (Logradouro) object;
        if ((this.logId == null && other.logId != null) || (this.logId != null && !this.logId.equals(other.logId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.api.desafio.model.Logradouro_1[ logId=" + logId + " ]";
    }

}

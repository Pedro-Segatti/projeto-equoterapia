package com.api.desafio.model;

import java.io.Serializable;
import java.util.Date;
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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author Pedro
 */
@Entity
@Table(name = "PESSOA")
public class Pessoa implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "PES_ID")
    private Integer pesId;
    @Basic(optional = false)
    @Column(name = "PES_NOME")
    private String pesNome;
    @Basic(optional = false)
    @Column(name = "PES_CPF")
    private String pesCpf;
    @Column(name = "PES_LOGIN_PASSWORD")
    private String pesLoginPassword;
    @Basic(optional = false)
    @Column(name = "PES_SEXO")
    private String pesSexo;
    @Basic(optional = false)
    @Column(name = "PES_DATA_NASC")
    @Temporal(TemporalType.DATE)
    private Date pesDataNasc;
    @Basic(optional = false)
    @Column(name = "PES_END_NUM")
    private int pesEndNum;
    @Column(name = "PES_END_COMPL")
    private String pesEndCompl;
    @Basic(optional = false)
    @Column(name = "PES_NACIONALIDADE")
    private String pesNacionalidade;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "pessoa")
    private List<Telefone> telefoneList;
    @JoinColumn(name = "PES_ID_LOG", referencedColumnName = "LOG_ID")
    @ManyToOne(optional = false)
    private Logradouro logradouro;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "pessoa")
    private List<Funcionario> funcionarioList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "pessoa")
    private List<Responsavel> responsavelList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "pessoa")
    private List<Praticante> praticanteList;

    public Pessoa() {
    }

    public Pessoa(Integer pesId) {
        this.pesId = pesId;
    }

    public Pessoa(Integer pesId, String pesNome, String pesCpf, String pesSexo, Date pesDataNasc, int pesEndNum, String pesNacionalidade) {
        this.pesId = pesId;
        this.pesNome = pesNome;
        this.pesCpf = pesCpf;
        this.pesSexo = pesSexo;
        this.pesDataNasc = pesDataNasc;
        this.pesEndNum = pesEndNum;
        this.pesNacionalidade = pesNacionalidade;
    }

    public Integer getPesId() {
        return pesId;
    }

    public void setPesId(Integer pesId) {
        this.pesId = pesId;
    }

    public String getPesNome() {
        return pesNome;
    }

    public void setPesNome(String pesNome) {
        this.pesNome = pesNome;
    }

    public String getPesCpf() {
        return pesCpf;
    }

    public void setPesCpf(String pesCpf) {
        this.pesCpf = pesCpf;
    }

    public String getPesLoginPassword() {
        return pesLoginPassword;
    }

    public void setPesLoginPassword(String pesLoginPassword) {
        this.pesLoginPassword = pesLoginPassword;
    }

    public String getPesSexo() {
        return pesSexo;
    }

    public void setPesSexo(String pesSexo) {
        this.pesSexo = pesSexo;
    }

    public Date getPesDataNasc() {
        return pesDataNasc;
    }

    public void setPesDataNasc(Date pesDataNasc) {
        this.pesDataNasc = pesDataNasc;
    }

    public int getPesEndNum() {
        return pesEndNum;
    }

    public void setPesEndNum(int pesEndNum) {
        this.pesEndNum = pesEndNum;
    }

    public String getPesEndCompl() {
        return pesEndCompl;
    }

    public void setPesEndCompl(String pesEndCompl) {
        this.pesEndCompl = pesEndCompl;
    }

    public String getPesNacionalidade() {
        return pesNacionalidade;
    }

    public void setPesNacionalidade(String pesNacionalidade) {
        this.pesNacionalidade = pesNacionalidade;
    }

    public List<Telefone> getTelefoneList() {
        return telefoneList;
    }

    public void setTelefoneList(List<Telefone> telefoneList) {
        this.telefoneList = telefoneList;
    }

    public Logradouro getLogradouro() {
        return logradouro;
    }

    public void setLogradouro(Logradouro logradouro) {
        this.logradouro = logradouro;
    }

    public List<Funcionario> getFuncionarioList() {
        return funcionarioList;
    }

    public void setFuncionarioList(List<Funcionario> funcionarioList) {
        this.funcionarioList = funcionarioList;
    }

    public List<Responsavel> getResponsavelList() {
        return responsavelList;
    }

    public void setResponsavelList(List<Responsavel> responsavelList) {
        this.responsavelList = responsavelList;
    }

    public List<Praticante> getPraticanteList() {
        return praticanteList;
    }

    public void setPraticanteList(List<Praticante> praticanteList) {
        this.praticanteList = praticanteList;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (pesId != null ? pesId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Pessoa)) {
            return false;
        }
        Pessoa other = (Pessoa) object;
        if ((this.pesId == null && other.pesId != null) || (this.pesId != null && !this.pesId.equals(other.pesId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.api.desafio.model.Pessoa[ pesId=" + pesId + " ]";
    }

}

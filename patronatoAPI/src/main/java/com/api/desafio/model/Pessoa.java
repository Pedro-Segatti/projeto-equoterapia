package com.api.desafio.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.commons.codec.digest.DigestUtils;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.*;

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
    @Lob
    @Basic(optional = true)
    @Column(name = "PES_FOTO")
    private String pesFoto;
    @Column(name = "PES_EMAIL1")
    @Basic(optional = false)
    private String pesEmail1;
    @Column(name = "PES_EMAIL2")
    @Basic(optional = true)
    private String pesEmail2;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "pessoa")
    private List<Telefone> telefoneList;
    @JoinColumn(name = "PES_ID_LOG", referencedColumnName = "LOG_ID")
    @ManyToOne(optional = false)
    private Logradouro logradouro; // Estudar para remapear usando tabela de ligação
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "pessoa")
    private List<Funcionario> funcionarioList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "pessoa")
    private List<Responsavel> responsavelList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "pessoa")
    private List<Praticante> praticanteList;
    @Transient
    @JsonProperty("access_token")
    private String pesAcessToken;

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
    @JsonIgnore
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

    public String getPesFoto() {
        return pesFoto;
    }

    public void setPesFoto(String pesFoto) {
        this.pesFoto = pesFoto;
    }

    public String getPesEmail1() {
        return pesEmail1;
    }

    public void setPesEmail1(String pesEmail1) {
        this.pesEmail1 = pesEmail1;
    }

    public String getPesEmail2() {
        return pesEmail2;
    }

    public void setPesEmail2(String pesEmail2) {
        this.pesEmail2 = pesEmail2;
    }

    public List<Telefone> getTelefoneList() {
        return telefoneList;
    }

    public void setTelefoneList(List<Telefone> telefoneList) {
        this.telefoneList = telefoneList;
    }

    @JsonIgnore
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

    public String getPesAcessToken() {
        if(this.pesId == null){
            return "";
        }
        if(this.pesCpf == null || this.pesCpf.isEmpty()){
            return "";
        }

        return pesAcessToken = DigestUtils.md5Hex(this.pesId + Math.random() + this.pesCpf).toUpperCase();
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

package com.api.desafio.model;

import com.api.desafio.utils.DateUtil;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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
import javax.persistence.ManyToMany;
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
@Table(name = "FUNCIONARIO")
public class Funcionario implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "FUNC_ID")
    private Integer funcId;
    @Basic(optional = false)
    @Column(name = "FUNC_DATA_ADMISSAO")
    @Temporal(TemporalType.DATE)
    private Date funcDataAdmissao;
    @Column(name = "FUNC_DATA_DESLIGAMENTO")
    @Temporal(TemporalType.DATE)
    private Date funcDataDesligamento;
    @Column(name = "FUNC_PIS")
    private String funcPis;
    @Column(name = "FUNC_CNH")
    private String funcCnh;
    @ManyToMany(mappedBy = "funcionarioList")
    private List<FichaEvolucao> fichaEvolucaoList;
    @ManyToMany(mappedBy = "funcionarioList")
    private List<Cargo> cargoList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "amnIdFuncionario")
    private List<FichaAnamnese> fichaAnamneseList;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "aftIdFuncionario")
    private List<AvalFisioter> avalFisioterList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "axfIdFuncionario")
    private List<AgendamentoFuncionario> agendamentoFuncionarioList;
    @JoinColumn(name = "FUNC_ID_PESSOA", referencedColumnName = "PES_ID")
    @ManyToOne(optional = false)
    private Pessoa pessoa;

    public Funcionario() {
    }

    public Funcionario(Integer funcId) {
        this.funcId = funcId;
    }

    public Funcionario(Integer funcId, Date funcDataAdmissao) {
        this.funcId = funcId;
        this.funcDataAdmissao = funcDataAdmissao;
    }

    public Integer getFuncId() {
        return funcId;
    }

    public void setFuncId(Integer funcId) {
        this.funcId = funcId;
    }

    public Date getFuncDataAdmissao() {
        return funcDataAdmissao;
    }

    public void setFuncDataAdmissao(Date funcDataAdmissao) {
        this.funcDataAdmissao = funcDataAdmissao;
    }

    public Date getFuncDataDesligamento() {
        return funcDataDesligamento;
    }

    public void setFuncDataDesligamento(Date funcDataDesligamento) {
        this.funcDataDesligamento = funcDataDesligamento;
    }

    public String getFuncPis() {
        return funcPis;
    }

    public void setFuncPis(String funcPis) {
        this.funcPis = funcPis;
    }

    public String getFuncCnh() {
        return funcCnh;
    }

    public void setFuncCnh(String funcCnh) {
        this.funcCnh = funcCnh;
    }

    public List<FichaEvolucao> getFichaEvolucaoList() {
        return fichaEvolucaoList;
    }

    public void setFichaEvolucaoList(List<FichaEvolucao> fichaEvolucaoList) {
        this.fichaEvolucaoList = fichaEvolucaoList;
    }

    public List<Cargo> getCargoList() {
        return cargoList;
    }

    public void setCargoList(List<Cargo> cargoList) {
        this.cargoList = cargoList;
    }

    public List<FichaAnamnese> getFichaAnamneseList() {
        return fichaAnamneseList;
    }

    public void setFichaAnamneseList(List<FichaAnamnese> fichaAnamneseList) {
        this.fichaAnamneseList = fichaAnamneseList;
    }

    public List<AvalFisioter> getAvalFisioterList() {
        return avalFisioterList;
    }

    public void setAvalFisioterList(List<AvalFisioter> avalFisioterList) {
        this.avalFisioterList = avalFisioterList;
    }
    @JsonIgnore
    public List<AgendamentoFuncionario> getAgendamentoFuncionarioList() {
        return agendamentoFuncionarioList;
    }
    @JsonIgnore
    public void setAgendamentoFuncionarioList(List<AgendamentoFuncionario> agendamentoFuncionarioList) {
        this.agendamentoFuncionarioList = agendamentoFuncionarioList;
    }

    public Pessoa getPessoa() {
        return pessoa;
    }

    public void setPessoa(Pessoa pessoa) {
        this.pessoa = pessoa;
    }

    public String getFuncDataAdmissaoFormatada(){
        return DateUtil.dataFormatada(funcDataAdmissao);
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (funcId != null ? funcId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Funcionario)) {
            return false;
        }
        Funcionario other = (Funcionario) object;
        if ((this.funcId == null && other.funcId != null) || (this.funcId != null && !this.funcId.equals(other.funcId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.api.desafio.model.Funcionario[ funcId=" + funcId + " ]";
    }

}

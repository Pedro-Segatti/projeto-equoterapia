package com.api.desafio.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

/**
 *
 * @author Pedro
 */
@Entity
@Table(name = "CARGO")
public class Cargo implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "CAR_ID")
    private Integer carId;
    @Basic(optional = false)
    @Column(name = "CAR_DESCRICAO")
    private String carDescricao;
    @JoinTable(name = "funcionario_cargo", joinColumns = {
        @JoinColumn(name = "FXC_ID_CARGO", referencedColumnName = "CAR_ID")}, inverseJoinColumns = {
        @JoinColumn(name = "FXC_ID_FUNC", referencedColumnName = "FUNC_ID")})
    @ManyToMany
    private List<Funcionario> funcionarioList;

    public Cargo() {
    }

    public Cargo(Integer carId) {
        this.carId = carId;
    }

    public Cargo(Integer carId, String carDescricao) {
        this.carId = carId;
        this.carDescricao = carDescricao;
    }

    public Integer getCarId() {
        return carId;
    }

    public void setCarId(Integer carId) {
        this.carId = carId;
    }

    public String getCarDescricao() {
        return carDescricao;
    }

    public void setCarDescricao(String carDescricao) {
        this.carDescricao = carDescricao;
    }
@JsonIgnore
    public List<Funcionario> getFuncionarioList() {
        return funcionarioList;
    }
    @JsonIgnore
    public void setFuncionarioList(List<Funcionario> funcionarioList) {
        this.funcionarioList = funcionarioList;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (carId != null ? carId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Cargo)) {
            return false;
        }
        Cargo other = (Cargo) object;
        if ((this.carId == null && other.carId != null) || (this.carId != null && !this.carId.equals(other.carId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.api.desafio.model.Cargo[ carId=" + carId + " ]";
    }
    
}

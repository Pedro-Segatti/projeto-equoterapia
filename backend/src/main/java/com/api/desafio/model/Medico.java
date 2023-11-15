package com.api.desafio.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "MEDICO")
public class Medico implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "MED_ID")
    private Integer medId;
    @JoinColumn(name = "MED_ID_PESSOA", referencedColumnName = "PES_ID")
    @ManyToOne(optional = false)
    private Pessoa pessoa;

    public Medico() {
    }

    public Medico(Integer medId) {
        this.medId = medId;
    }

    public Integer getMedId() {
        return medId;
    }

    public void setMedId(Integer medId) {
        this.medId = medId;
    }

    public Pessoa getPessoa() {
        return pessoa;
    }

    public void setPessoa(Pessoa pessoa) {
        this.pessoa = pessoa;
    }
}

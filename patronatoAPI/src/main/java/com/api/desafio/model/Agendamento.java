package com.api.desafio.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import javax.persistence.*;

/**
 *
 * @author Pedro
 */
@Entity
@Table(name = "AGENDAMENTO")
public class Agendamento implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "AGD_ID")
    private Integer agdId;
    @Basic(optional = false)
    @Column(name = "AGD_DATA")
    @Temporal(TemporalType.DATE)
    private Date agdData;
    @Basic(optional = false)
    @Column(name = "AGD_HORA")
    @Temporal(TemporalType.TIME)
    private Date agdHora;
    @Basic(optional = false)
    @Column(name = "AGD_DESCRICAO")
    private String agdDescricao;
    @Basic(optional = false)
    @Column(name = "AGD_CONCLUIDO")
    private boolean agdConcluido;
    @Column(name = "AGD_OBSERVACOES")
    private String agdObservacoes;
    @JoinColumn(name = "AGD_ID_PRATICANTE", referencedColumnName = "PRAT_ID")
    @ManyToOne(optional = false)
    private Praticante praticante;
    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.DETACH})
    @JoinTable(name = "AGENDAMENTO_MATERIAL",
            joinColumns = @JoinColumn(name = "AXM_ID_AGENDAMENTO", referencedColumnName = "AGD_ID"),
            inverseJoinColumns = @JoinColumn(name = "AXM_ID_MATERIAL", referencedColumnName = "MAT_ID"))
    private List<Material> materialList;
    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.DETACH})
    @JoinTable(name = "AGENDAMENTO_FUNCIONARIO",
                joinColumns = @JoinColumn(name = "AXF_ID_AGENDAMENTO", referencedColumnName = "AGD_ID"),
                inverseJoinColumns = @JoinColumn(name = "AXF_ID_FUNCIONARIO", referencedColumnName = "FUNC_ID"))
    private List<Funcionario> funcionarioList;
    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.DETACH})
    @JoinTable(name = "AGENDAMENTO_ANIMAL",
            joinColumns = @JoinColumn(name = "AXA_ID_AGENDAMENTO", referencedColumnName = "AGD_ID"),
            inverseJoinColumns = @JoinColumn(name = "AXA_ID_ANIMAL", referencedColumnName = "ANI_ID"))
    private List<Animal> animalList;

    public Agendamento() {
    }

    public Agendamento(Integer agdId) {
        this.agdId = agdId;
    }

    public Agendamento(Integer agdId, Date agdData, String agdDescricao) {
        this.agdId = agdId;
        this.agdData = agdData;
        this.agdDescricao = agdDescricao;
    }

    public Integer getAgdId() {
        return agdId;
    }

    public void setAgdId(Integer agdId) {
        this.agdId = agdId;
    }

    public Date getAgdData() {
        return agdData;
    }

    public void setAgdData(Date agdData) {
        this.agdData = agdData;
    }

    public Date getAgdHora() {
        return agdHora;
    }

    public void setAgdHora(Date agdHora) {
        this.agdHora = agdHora;
    }

    public String getAgdDescricao() {
        return agdDescricao;
    }

    public void setAgdDescricao(String agdDescricao) {
        this.agdDescricao = agdDescricao;
    }

    public boolean isAgdConcluido() {
        return agdConcluido;
    }

    public void setAgdConcluido(boolean agdConcluido) {
        this.agdConcluido = agdConcluido;
    }

    public String getAgdObservacoes() {
        return agdObservacoes;
    }

    public void setAgdObservacoes(String agdObservacoes) {
        this.agdObservacoes = agdObservacoes;
    }

    public Praticante getPraticante() {
        return praticante;
    }

    public void setPraticante(Praticante praticante) {
        this.praticante = praticante;
    }

    public List<Material> getMaterialList() {
        return materialList;
    }

    public void setMaterialList(List<Material> materialList) {
        this.materialList = materialList;
    }

    public List<Funcionario> getFuncionarioList() {
        return funcionarioList;
    }

    public void setFuncionarioList(List<Funcionario> funcionarioList) {
        this.funcionarioList = funcionarioList;
    }

    public List<Animal> getAnimalList() {
        return animalList;
    }

    public void setAnimalList(List<Animal> animalList) {
        this.animalList = animalList;
    }

    public String getAgdDataFormatada(){
        SimpleDateFormat simpleformat = new SimpleDateFormat("dd/MM/yyyy");
        String dataFormatada = simpleformat.format(this.agdData);
        return dataFormatada;
    }
    public String getAgdHoraFormatada(){
        SimpleDateFormat simpleformat = new SimpleDateFormat("HH:mm");
        String horaFormatada = simpleformat.format(this.agdHora);
        return horaFormatada;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (agdId != null ? agdId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Agendamento)) {
            return false;
        }
        Agendamento other = (Agendamento) object;
        if ((this.agdId == null && other.agdId != null) || (this.agdId != null && !this.agdId.equals(other.agdId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.api.desafio.model.Agendamento[ agdId=" + agdId + " ]";
    }
    
}

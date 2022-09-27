package com.api.desafio.model;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 *
 * @author Pedro
 */
@Entity
@Table(name = "FICHA_EVOL_ATIVIDADE_MATERIAL")
public class FichaEvolAtividadeMaterial implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "FXAT_ID")
    private Integer fxatId;
    @JoinColumn(name = "FXAT_ID_ATIVIDADE", referencedColumnName = "ATV_ID")
    @ManyToOne(optional = false)
    private Atividade atividade;
    @JoinColumn(name = "FXAT_ID_FICHA", referencedColumnName = "EVOL_ID")
    @ManyToOne(optional = false)
    private FichaEvolucao fichaEvolucao;
    @JoinColumn(name = "FXAT_ID_MATERIAL", referencedColumnName = "MAT_ID")
    @ManyToOne(optional = false)
    private Material material;

    public FichaEvolAtividadeMaterial() {
    }

    public FichaEvolAtividadeMaterial(Integer fxatId) {
        this.fxatId = fxatId;
    }

    public Integer getFxatId() {
        return fxatId;
    }

    public void setFxatId(Integer fxatId) {
        this.fxatId = fxatId;
    }

    public Atividade getAtividade() {
        return atividade;
    }

    public void setAtividade(Atividade atividade) {
        this.atividade = atividade;
    }

    public FichaEvolucao getFichaEvolucao() {
        return fichaEvolucao;
    }

    public void setFichaEvolucao(FichaEvolucao fichaEvolucao) {
        this.fichaEvolucao = fichaEvolucao;
    }

    public Material getMaterial() {
        return material;
    }

    public void setMaterial(Material material) {
        this.material = material;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (fxatId != null ? fxatId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof FichaEvolAtividadeMaterial)) {
            return false;
        }
        FichaEvolAtividadeMaterial other = (FichaEvolAtividadeMaterial) object;
        if ((this.fxatId == null && other.fxatId != null) || (this.fxatId != null && !this.fxatId.equals(other.fxatId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.api.desafio.model.FichaEvolAtividadeMaterial[ fxatId=" + fxatId + " ]";
    }

}

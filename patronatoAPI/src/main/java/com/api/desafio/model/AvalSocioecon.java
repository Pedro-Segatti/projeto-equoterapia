package com.api.desafio.model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.*;

/**
 *
 * @author Pedro
 */
@Entity
@Table(name = "AVAL_SOCIOECON")
public class AvalSocioecon implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "ASE_ID")
    private Integer aseId;

    @Column(name = "ASE_DATA")
    @Temporal(TemporalType.DATE)
    private Date aseData;
    @Basic(optional = false)
    @Lob
    @Column(name = "ASE_OBS_CONT_FAM")
    private String aseObsContFam;
    @Basic(optional = false)
    @Lob
    @Column(name = "ASE_OBS_MEDICAMENTOS")
    private String aseObsMedicamentos;
    @JoinColumn(name = "ASE_ID_PRATICANTE", referencedColumnName = "PRAT_ID")
    @ManyToOne(optional = false)
    private Praticante praticante;

    public AvalSocioecon() {
    }

    public AvalSocioecon(Integer aseId) {
        this.aseId = aseId;
    }

    public AvalSocioecon(Integer aseId, Date aseDate, String aseObsContFam, String aseObsMedicamentos) {
        this.aseId = aseId;
        this.aseData = aseDate;
        this.aseObsContFam = aseObsContFam;
        this.aseObsMedicamentos = aseObsMedicamentos;
    }

    public Integer getAseId() {
        return aseId;
    }

    public void setAseId(Integer aseId) {
        this.aseId = aseId;
    }

    public Date getAseData() {return aseData;}

    public void setAseData(Date aseData) {this.aseData = aseData;}

    public String getAseObsContFam() {
        return aseObsContFam;
    }

    public void setAseObsContFam(String aseObsContFam) {
        this.aseObsContFam = aseObsContFam;
    }

    public String getAseObsMedicamentos() {
        return aseObsMedicamentos;
    }

    public void setAseObsMedicamentos(String aseObsMedicamentos) {
        this.aseObsMedicamentos = aseObsMedicamentos;
    }

    public Praticante getPraticante() {
        return praticante;
    }

    public void setPraticante(Praticante praticante) {
        this.praticante = praticante;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (aseId != null ? aseId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof AvalSocioecon)) {
            return false;
        }
        AvalSocioecon other = (AvalSocioecon) object;
        if ((this.aseId == null && other.aseId != null) || (this.aseId != null && !this.aseId.equals(other.aseId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.api.desafio.model.AvalSocioecon[ aseId=" + aseId + " ]";
    }
    
}

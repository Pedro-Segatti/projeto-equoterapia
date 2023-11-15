package com.api.desafio.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "CONFIGURACOES")
public class Configuracoes implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "CONF_ID")
    private Integer confId;
    @Basic(optional = false)
    @Column(name = "CONF_EMAIL")
    private String confEmail;
    @Column(name = "CONF_EMAIL_PASSWORD")
    private String confEmailPassword;
    @Column(name = "CONF_EMAIL_CORPO")
    private String confEmailCorpo;
    @Lob
    @Column(name = "CONF_IMAGE_LOGO")
    private String confImageLogo;
    @Lob
    @Column(name = "CONF_IMAGE_LOADING")
    private String confImageLoading;
    @Lob
    @Column(name = "CONF_IMAGE_LOGIN")
    private String confImageLogin;

    public Configuracoes() {
    }

    public Configuracoes(Integer confId) {
        this.confId = confId;
    }

    public Configuracoes(String confEmail, String confEmailPassword, String confEmailCorpo, String confImageLogo, String confImageLoading, String confImageLogin) {
        this.confEmail = confEmail;
        this.confEmailPassword = confEmailPassword;
        this.confEmailCorpo = confEmailCorpo;
        this.confImageLogo = confImageLogo;
        this.confImageLoading = confImageLoading;
        this.confImageLogin = confImageLogin;
    }

    public Integer getConfId() {
        return confId;
    }

    public void setConfId(Integer confId) {
        this.confId = confId;
    }

    public String getConfEmail() {
        return confEmail;
    }

    public void setConfEmail(String confEmail) {
        this.confEmail = confEmail;
    }

    public String getConfEmailPassword() {
        return confEmailPassword;
    }

    public void setConfEmailPassword(String confEmailPassword) {
        this.confEmailPassword = confEmailPassword;
    }

    public String getConfEmailCorpo() {
        return confEmailCorpo;
    }

    public void setConfEmailCorpo(String confEmailCorpo) {
        this.confEmailCorpo = confEmailCorpo;
    }

    public String getConfImageLogo() {
        return confImageLogo;
    }

    public void setConfImageLogo(String confImageLogo) {
        this.confImageLogo = confImageLogo;
    }

    public String getConfImageLoading() {
        return confImageLoading;
    }

    public void setConfImageLoading(String confImageLoading) {
        this.confImageLoading = confImageLoading;
    }

    public String getConfImageLogin() {
        return confImageLogin;
    }

    public void setConfImageLogin(String confImageLogin) {
        this.confImageLogin = confImageLogin;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (confId != null ? confId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof Configuracoes)) {
            return false;
        }
        Configuracoes other = (Configuracoes) object;
        if ((this.confId == null && other.confId != null) || (this.confId != null && !this.confId.equals(other.confId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.api.desafio.model.Configuracoes[ confId=" + confId + " ]";
    }
}

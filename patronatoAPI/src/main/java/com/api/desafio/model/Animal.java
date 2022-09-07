package com.api.desafio.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name="ANIMAL")
public class Animal implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ANI_COD")
    private Integer aniCod;
    @Column(name="ANI_NOME",length = 60)
    private String aniNome;
    @Column(name="ANI_IDADE")
    private Integer aniIdade;
    @Column(name="ANI_PORTE",length = 2)
    private String aniPorte;

    public Animal() {
    }

    public Integer getAniCod() {
        return aniCod;
    }

    public void setAniCod(Integer aniCod) {
        this.aniCod = aniCod;
    }

    public String getAniNome() {
        return aniNome;
    }

    public void setAniNome(String aniNome) {
        this.aniNome = aniNome;
    }

    public Integer getAniIdade() {
        return aniIdade;
    }

    public void setAniIdade(Integer aniIdade) {
        this.aniIdade = aniIdade;
    }

    public String getAniPorte() {
        return aniPorte;
    }

    public void setAniPorte(String aniPorte) {
        this.aniPorte = aniPorte;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Animal animal = (Animal) o;
        return aniCod.equals(animal.aniCod);
    }

    @Override
    public int hashCode() {
        return Objects.hash(aniCod);
    }
}

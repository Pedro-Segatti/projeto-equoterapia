package com.api.desafio.service;

import com.api.desafio.crudFiles.AgendamentoCrud;
import com.api.desafio.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@Component
@Transactional
public class AgendamentoService {

    @Autowired
    private AgendamentoCrud agendamentoCrud;

    public Agendamento salva(Agendamento agendamento) {
        return agendamentoCrud.save(agendamento);
    }

    public void remove(Integer agdId) {
        Agendamento agd = agendamentoCrud.findByAgdId(agdId);
        agendamentoCrud.delete(agd);
    }

    public ResponseEntity<List<Agendamento>> pesquisaAgendamentos(Integer pratId, Date agdData, Date agdHora, boolean agdConcluido) {
        List<Agendamento> agendamentos = agendamentoCrud.findByPratIdAndAgdDataAndAgdHoraAndAgdConcluido(pratId, agdData, agdHora, agdConcluido);
        return new ResponseEntity<List<Agendamento>>(agendamentos, HttpStatus.OK);
    }

    public ResponseEntity<List<Agendamento>> pesquisaAgendamentosDoPeriodo(Date agdDataInicial, Date agdDataFinal, boolean agdConcluido) {
        List<Agendamento> agendamentos = agendamentoCrud.findAgendamentosDoPeriodo(agdDataInicial, agdDataFinal, agdConcluido);
        return new ResponseEntity<List<Agendamento>>(agendamentos, HttpStatus.OK);
    }

    public List<Agendamento> pesquisaAgendamentosDiferetesDeDaMesmaDataEHora(Integer agdId, Date agdData, Date agdHora) {
        return agendamentoCrud.findAgendamentosDiferentesDaMesmaDataEHora(agdId, agdData, agdHora);
    }

    public ResponseEntity<List<Agendamento>> pesquisaAgendamentosAtivos() {
        List<Agendamento> agendamentos = agendamentoCrud.findAtivos();
        return new ResponseEntity<List<Agendamento>>(agendamentos, HttpStatus.OK);
    }

    public List<Agendamento> pesquisaAgendamentosByAgdDataAndAgdHoraAndExistsAnimal(Date agdData, Date agdHora, Integer agdDifDe, List<Animal> animalList) {
       return agendamentoCrud.findAgendamentosByAgdDataAndAgdHoraAndExistsAnimal(agdData, agdHora, agdDifDe, animalList);
    }
    public List<Agendamento> pesquisaAgendamentosByAgdDataAndAgdHoraAndExistsFuncionario(Date agdData, Date agdHora, Integer agdDifDe, List<Funcionario> funcionarioList) {
        return agendamentoCrud.findAgendamentosByAgdDataAndAgdHoraAndExistsFuncionario(agdData, agdHora, agdDifDe,funcionarioList);
    }

    public List<Agendamento> pesquisaAgendamentosByAgdDataAndAgdHoraAndExistsMaterial(Date agdData, Date agdHora, Integer agdDifDe, List<Material> materialList) {
        return agendamentoCrud.findAgendamentosByAgdDataAndAgdHoraAndExistsMaterial(agdData, agdHora, agdDifDe, materialList);
    }

    public Agendamento pesquisaPorCodigo(Integer agdId) {
        return agendamentoCrud.findById(agdId).orElse(null);
    }
}

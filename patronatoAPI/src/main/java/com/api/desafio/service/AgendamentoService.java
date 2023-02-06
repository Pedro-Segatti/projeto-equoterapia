package com.api.desafio.service;

import com.api.desafio.crudFiles.AgendamentoCrud;
import com.api.desafio.model.Agendamento;
import com.api.desafio.model.FichaEvolucao;
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

    public ResponseEntity<List<Agendamento>> pesquisaAgendamentos(Integer pratId, Date agdData) {
        List<Agendamento> agendamentos = agendamentoCrud.findByPratIdAndAgdData(pratId, agdData);
        return new ResponseEntity<List<Agendamento>>(agendamentos, HttpStatus.OK);
    }

    public ResponseEntity<List<Agendamento>> pesquisaAgendamentosAtivos() {
        List<Agendamento> agendamentos = agendamentoCrud.findAtivos();
        return new ResponseEntity<List<Agendamento>>(agendamentos, HttpStatus.OK);
    }

    public Agendamento pesquisaPorCodigo(Integer agdId) {
        return agendamentoCrud.findById(agdId).orElse(null);
    }
}

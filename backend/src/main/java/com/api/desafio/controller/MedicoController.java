package com.api.desafio.controller;

import com.api.desafio.model.Medico;
import com.api.desafio.model.Pessoa;
import com.api.desafio.service.MedicoService;
import com.api.desafio.service.PessoaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MedicoController {

    @Autowired
    private MedicoService medicoService;
    @Autowired
    private PessoaService pessoaService;

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaMedico")
    public ResponseEntity<List<Medico>> pesquisaMedico(@RequestParam(required = false) String pesCpf, @RequestParam(required = false) String pesNome, @RequestParam(required = false) Integer medId) {
        return medicoService.pesquisaMedico(pesCpf, pesNome, medId);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removeMedico")
    public ResponseEntity<Medico> removeMedico(@RequestParam(required = false) Integer medId) {
        try {
            medicoService.remove(medId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastraMedico")
    public ResponseEntity<Medico> cadastrarMedico(@RequestBody Medico medico) {
        boolean adicionando = medico.getMedId() == null;

        Pessoa pessoa = null;
        if (adicionando) {
            pessoa = pessoaService.getPessoaByPesCpf(medico.getPessoa().getPesCpf());
            if (pessoa != null) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }

        medico.getPessoa().getTelefoneList().forEach(tel -> tel.setPessoa(medico.getPessoa()));

        pessoaService.salva(medico.getPessoa());
        medicoService.salva(medico);
        return new ResponseEntity<Medico>(medico, HttpStatus.OK);
    }
}

package com.api.desafio.controller;

import com.api.desafio.model.Configuracoes;
import com.api.desafio.model.Funcionario;
import com.api.desafio.model.Pessoa;
import com.api.desafio.service.ConfiguracoesService;
import com.api.desafio.service.FuncionarioService;
import com.api.desafio.service.PessoaService;
import com.api.desafio.utils.RelatorioUtil;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class FuncionarioController {

    @Autowired
    private FuncionarioService funcionarioService;
    @Autowired
    private PessoaService pessoaService;
    @Autowired
    private ConfiguracoesService configuracoesService;

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaFuncionario")

    public ResponseEntity<List<Funcionario>> pesquisaFuncionario(@RequestParam(required = false) String pesCpf, @RequestParam(required = false) String pesNome, @RequestParam(required = false) Integer funcId) {
        return funcionarioService.pesquisaFuncionario(pesCpf, pesNome, funcId);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastrarFuncionario")
    public ResponseEntity<Funcionario> cadastrarFuncionario(@RequestBody Funcionario funcionario) {
        funcionario.getPessoa().getTelefoneList().forEach(tel -> tel.setPessoa(funcionario.getPessoa()));
        boolean adicionando = funcionario.getFuncId() == null;

        Pessoa pessoa = null;
        if (adicionando) {
            pessoa = pessoaService.getPessoaByPesCpf(funcionario.getPessoa().getPesCpf());
            if (pessoa != null) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
        pessoa = pessoaService.salva(funcionario.getPessoa());
        funcionario.setPessoa(pessoa);
        return new ResponseEntity<Funcionario>(funcionarioService.salva(funcionario), HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/relatorioFuncionarios")
    public ResponseEntity<byte[]> gerarRelatorioFuncionarios(@RequestBody String jsonParams) {
        JsonObject jsonConvertido = new Gson().fromJson(jsonParams, JsonObject.class);
        List<Funcionario> funcionarios = funcionarioService.pesquisaFuncionario("", "", null).getBody();
        Configuracoes config = configuracoesService.getConfiguracoes();
        return RelatorioUtil.gerarRelatorios(jsonConvertido, funcionarios, config);
    }
}

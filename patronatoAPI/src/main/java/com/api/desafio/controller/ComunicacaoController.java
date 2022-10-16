package com.api.desafio.controller;

import com.api.desafio.model.Animal;
import com.api.desafio.model.FichaEvolucao;
import com.api.desafio.model.Pessoa;
import com.api.desafio.service.AnimalService;
import com.api.desafio.service.FichaEvolService;
import com.api.desafio.service.PessoaService;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ComunicacaoController {

    @Autowired
    private AnimalService animalService;
    @Autowired
    private PessoaService pessoaService;
    @Autowired
    private FichaEvolService fichaEvolService;

    @CrossOrigin(origins = "*")
    @GetMapping("/login")
        public ResponseEntity<?> getAuthenticate(@RequestParam String login,@RequestParam String password){
            if(login == null || login.isEmpty() || password == null || password.isEmpty()){
                return new ResponseEntity<Pessoa>(new Pessoa(), HttpStatus.BAD_REQUEST);
            }

            Pessoa pessoa = pessoaService.getPessoaByPesCpf(login);
            if(pessoa == null){
                return new ResponseEntity<Pessoa>(new Pessoa(), HttpStatus.NOT_FOUND);
            }

            String encryptPassword = DigestUtils.md5Hex(password);
            if(pessoa.getPesLoginPassword().equals(encryptPassword)){
                return new ResponseEntity<Pessoa>(pessoa, HttpStatus.OK);
            }

            return new ResponseEntity<Pessoa>(new Pessoa(), HttpStatus.NOT_FOUND);
        }

    @CrossOrigin(origins = "*")
    @GetMapping("/pessoaLogada")
    public ResponseEntity<?> getPessoaLogada(@RequestParam Integer id){
        if(id == null){
            return new ResponseEntity<Pessoa>(new Pessoa(), HttpStatus.BAD_REQUEST);
        }

        Pessoa pessoa = pessoaService.getPessoaByPesId(id);
        if(pessoa == null){
            return new ResponseEntity<Pessoa>(new Pessoa(), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Pessoa>(pessoa, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastraAnimal")
    public ResponseEntity<?> cadastrarAnimal(@RequestBody Animal animal){
        return animalService.salva(animal);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removeAnimal")
    public ResponseEntity<?> removeAnimal(@RequestParam Integer aniId){
        return animalService.remove(aniId);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaAnimal")
    public ResponseEntity<List<Animal>> pesquisaAnimais(@RequestParam (required=false) Integer aniId,@RequestParam (required=false) String aniNome ){
        return animalService.pesquisaAnimais(aniId,aniNome);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastraFichaEvol")
    public ResponseEntity<?> cadastrarFichaEvol(@RequestBody FichaEvolucao fichaEvolucao){
        return fichaEvolService.salva(fichaEvolucao);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removeFichaEvol")
    public ResponseEntity<?> removeFichaEvol(@RequestParam Integer evolId){
        return fichaEvolService.remove(evolId);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaFichaEvol")
    public ResponseEntity<List<FichaEvolucao>> pesquisaFichaEvol(@RequestParam (required=false) Integer evolId ){
        return fichaEvolService.pesquisa(evolId);
    }
}

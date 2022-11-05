package com.api.desafio.controller;

import com.api.desafio.model.*;
import com.api.desafio.service.*;
import com.api.desafio.model.Animal;
import com.api.desafio.model.AvalSocioecon;
import com.api.desafio.model.FichaEvolucao;
import com.api.desafio.model.Pessoa;
import com.api.desafio.service.AnimalService;
import com.api.desafio.service.AvalSocioeconService;
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
    @Autowired
    private AtividadeService atividadeService;
    @Autowired
    private MaterialService materialService;
    @Autowired
    private CargoService cargoService;
    @Autowired
    private PicadeiroService picadeiroService;
    @Autowired
    private AvalSocioeconService avalSocioeconService;

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

    //ANIMAL

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

    //ATIVIDADE

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastraAtividade")
    public ResponseEntity<?> cadastrarAtividade(@RequestBody Atividade atividade){
        return atividadeService.salva(atividade);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removeAtividade")
    public ResponseEntity<?> removeAtividade(@RequestParam Integer atvId){
        return atividadeService.remove(atvId);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaAtividade")
    public ResponseEntity<List<Atividade>> pesquisaAtividade(@RequestParam (required=false) Integer atvId,@RequestParam (required=false) String atvDescricao ){
        return atividadeService.pesquisa();
    }

    //CARGO

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastraCargo")
    public ResponseEntity<?> cadastrarCargo(@RequestBody Cargo cargo){
        return cargoService.salva(cargo);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removeCargo")
    public ResponseEntity<?> removeCargo(@RequestParam Integer carId){
        return cargoService.remove(carId);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaCargo")
    public ResponseEntity<List<Cargo>> pesquisaCargo(@RequestParam (required=false) Integer carId,@RequestParam (required=false) String carDescricao ){
        return cargoService.pesquisa();
    }

    //MATERIAL

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastraMaterial")
    public ResponseEntity<?> cadastrarMaterial(@RequestBody Material material){
        return materialService.salva(material);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removeMaterial")
    public ResponseEntity<?> removeMaterial(@RequestParam Integer matId){
        return materialService.remove(matId);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaMaterial")
    public ResponseEntity<List<Material>> pesquisaMaterial(@RequestParam (required=false) Integer matId,@RequestParam (required=false) String matDescricao ){
        return materialService.pesquisa();
    }

    //PICADEIRO

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastraPicadeiro")
    public ResponseEntity<?> cadastrarPicadeiro(@RequestBody Picadeiro picadeiro){
        return picadeiroService.salva(picadeiro);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removePicadeiro")
    public ResponseEntity<?> removePicadeiro(@RequestParam Integer picId){
        return picadeiroService.remove(picId);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaPicadeiro")
    public ResponseEntity<List<Picadeiro>> pesquisaPicadeiro(@RequestParam (required=false) Integer picId,@RequestParam (required=false) String picDescricao ){
        return picadeiroService.pesquisa();
    }


    //FICHA EVOLUÇÃO

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

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastraAvalSocioEcon")
    public ResponseEntity<?> cadastrarAvalSocioEcon(@RequestBody AvalSocioecon avalSocioEcon){
        return avalSocioeconService.salva(avalSocioEcon);
    }
    @CrossOrigin(origins = "*")
    @PostMapping("/removeAvalSocioEcon")
    public ResponseEntity<?> removerAvalSocioEcon(@RequestParam Integer ascId){
        return avalSocioeconService.remove(ascId);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaAvalSocioEcon")
    public ResponseEntity<List<AvalSocioecon>> pesquisaAvalSocioEcon(){
        return avalSocioeconService.pesquisa();
    }
}

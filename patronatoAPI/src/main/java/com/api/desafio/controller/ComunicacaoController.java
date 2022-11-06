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
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;
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
    @Autowired
    private LogradouroService logradouroService;
    @Autowired
    private PaisService paisService;
    @Autowired
    private PraticanteService praticanteService;

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


    @CrossOrigin(origins = "*")
    @PostMapping("/cadastrarPessoa")
    public ResponseEntity<?> cadastrarPessoa(@RequestBody String jsonPessoa){
        JsonObject jsonConvertido = new Gson().fromJson(jsonPessoa, JsonObject.class);
        Pessoa pessoaExistente = pessoaService.getPessoaByPesCpf(jsonConvertido.get("pesCpf").getAsString());

        if(pessoaExistente != null){
            return new ResponseEntity<Pessoa>(new Pessoa(), HttpStatus.BAD_REQUEST);
        }

        Logradouro logradouro = logradouroService.getLogradouroById(jsonConvertido.get("pesLogId").getAsInt());
        Pais pais = paisService.getPaisByIso(jsonConvertido.get("pesNacionalidade").getAsString());

        Pessoa novaPessoa = new Pessoa();
        novaPessoa = pessoaService.manipularPessoa(jsonConvertido, novaPessoa, logradouro, pais);
        novaPessoa.setPesLoginPassword(DigestUtils.md5Hex(novaPessoa.getPesId().toString() + novaPessoa.getPesCpf()));
        novaPessoa = pessoaService.salva(novaPessoa);

        return new ResponseEntity<Pessoa>(novaPessoa, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/atualizarPessoa")
    public ResponseEntity<?> atualizarPessoa(@RequestBody String jsonPessoa){
        JsonObject jsonConvertido = new Gson().fromJson(jsonPessoa, JsonObject.class);
        Pessoa pessoaExistente = pessoaService.getPessoaByPesCpf(jsonConvertido.get("pesCpf").getAsString());

        if(pessoaExistente == null){
            return new ResponseEntity<Pessoa>(new Pessoa(), HttpStatus.FORBIDDEN);
        }

        Logradouro logradouro = logradouroService.getLogradouroById(jsonConvertido.get("pesLogId").getAsInt());
        Pais pais = paisService.getPaisByIso(jsonConvertido.get("pesNacionalidade").getAsString());

        pessoaExistente = pessoaService.manipularPessoa(jsonConvertido, pessoaExistente, logradouro, pais);

        return new ResponseEntity<Pessoa>(pessoaExistente, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastrarPraticante")
    public ResponseEntity<?> cadastrarPraticante(@RequestBody String jsonPraticante){
        JsonObject jsonConvertido = new Gson().fromJson(jsonPraticante, JsonObject.class);
        Praticante novoPraticante = new Praticante();

        JsonElement idPessoa = jsonConvertido.get("pessoaId");
        if(idPessoa.isJsonNull()){
            return new ResponseEntity<Praticante>(novoPraticante, HttpStatus.FORBIDDEN);
        }

        Pessoa pes = pessoaService.getPessoaByPesId(idPessoa.getAsInt());
        novoPraticante.setPessoa(pes);
        novoPraticante.setPratAltura(jsonConvertido.get("pratAltura").getAsInt());
        novoPraticante.setPratPeso(jsonConvertido.get("pratPeso").getAsInt());

        novoPraticante = praticanteService.salva(novoPraticante);

        return new ResponseEntity<Praticante>(novoPraticante, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/atualizarPraticante")
    public ResponseEntity<?> atualizarPraticante(@RequestBody String jsonPraticante){
        JsonObject jsonConvertido = new Gson().fromJson(jsonPraticante, JsonObject.class);
        Praticante praticanteExistente = praticanteService.getPraticanteById(jsonConvertido.get("pratId").getAsInt());

        if(praticanteExistente == null){
            return new ResponseEntity<Praticante>(praticanteExistente, HttpStatus.FORBIDDEN);
        }

        praticanteExistente.setPratAltura(jsonConvertido.get("pratAltura").getAsInt());
        praticanteExistente.setPratPeso(jsonConvertido.get("pratPeso").getAsInt());

        praticanteExistente = praticanteService.salva(praticanteExistente);

        return new ResponseEntity<Praticante>(praticanteExistente, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaPraticantes")
    public ResponseEntity<List<Praticante>> pesquisaPraticantes(@RequestParam (required=false) String pesCpf,@RequestParam (required=false) String pesNome){
        return praticanteService.pesquisaPraticantes(pesCpf, pesNome);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removePraticante")
    public ResponseEntity<Praticante> removePraticante(@RequestParam (required=false) Integer pratId){
        try{
            praticanteService.remove(pratId);
            return new ResponseEntity<>(new Praticante(), HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(new Praticante(), HttpStatus.FORBIDDEN);
        }

    }
}

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
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ComunicacaoController {

    @Autowired
    private FichaEvolAtividadeMaterialService evolAtividadeMaterial;
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
    @Autowired
    private MontariaService montariaService;
    @Autowired
    private BairroService bairroService;
    @Autowired
    private CidadeService cidadeService;
    @Autowired
    private ResponsavelService responsavelService;
    @Autowired
    private FuncionarioService funcionarioService;
    @Autowired
    private DocumentosService documentosService;
    @Autowired
    private AvalFisioterService avalFisioterService;
    @Autowired
    private PraticanteResponsavelService praticanteResponsavelService;

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
    public ResponseEntity<Animal> removeAnimal(@RequestParam Integer aniId){
        try{
            Animal animal = animalService.remove(aniId);
            return new ResponseEntity<>(new Animal(), HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(new Animal(), HttpStatus.FORBIDDEN);
        }
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
        try{
            atividadeService.remove(atvId);
            return new ResponseEntity<>(new Atividade(), HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(new Atividade(), HttpStatus.FORBIDDEN);
        }
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaAtividade")
    public ResponseEntity<List<Atividade>> pesquisaAtividade(@RequestParam (required=false) Integer atvId,@RequestParam (required=false) String atvDescricao ){
        return atividadeService.pesquisa(atvId,atvDescricao);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastraCargo")
    public ResponseEntity<?> cadastrarCargo(@RequestBody Cargo cargo){
        return cargoService.salva(cargo);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removeCargo")
    public ResponseEntity<?> removeCargo(@RequestParam Integer carId){
        try{
            cargoService.remove(carId);
            return new ResponseEntity<>(new Cargo(), HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(new Cargo(), HttpStatus.FORBIDDEN);
        }
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaCargo")
    public ResponseEntity<List<Cargo>> pesquisaCargo(@RequestParam (required=false) Integer carId,@RequestParam (required=false) String carDescricao ){
        return cargoService.pesquisa(carId,carDescricao);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastraMaterial")
    public ResponseEntity<?> cadastrarMaterial(@RequestBody Material material){
        return materialService.salva(material);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removeMaterial")
    public ResponseEntity<?> removeMaterial(@RequestParam Integer matId){
        try{
            materialService.remove(matId);
            return new ResponseEntity<>(new Material(), HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(new Material(), HttpStatus.FORBIDDEN);
        }
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaMaterial")
    public ResponseEntity<List<Material>> pesquisaMaterial(@RequestParam (required=false) Integer matId,@RequestParam (required=false) String matDescricao ){
        return materialService.pesquisa(matId,matDescricao);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastraPicadeiro")
    public ResponseEntity<?> cadastrarPicadeiro(@RequestBody Picadeiro picadeiro){
        return picadeiroService.salva(picadeiro);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removePicadeiro")
    public ResponseEntity<Picadeiro> removePicadeiro(@RequestParam Integer picId){
        try{
            picadeiroService.remove(picId);
            return new ResponseEntity<>(new Picadeiro(), HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(new Picadeiro(), HttpStatus.FORBIDDEN);
        }
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaPicadeiro")
    public ResponseEntity<List<Picadeiro>> pesquisaPicadeiro(@RequestParam (required=false) Integer picId,@RequestParam (required=false) String picDescricao ){
        return picadeiroService.pesquisa(picId,picDescricao);
    }


    @CrossOrigin(origins = "*")
    @PostMapping("/cadastraFichaEvol")
    public ResponseEntity<FichaEvolucao> cadastrarFichaEvol(@RequestBody FichaEvolucao fichaEvolucao){
        if(fichaEvolucao.getEvolId() != null){
            FichaEvolucao evol = fichaEvolService.pesquisaPorCodigo(fichaEvolucao.getEvolId());
            for (FichaEvolAtividadeMaterial oldEv : evol.getFichaEvolAtividadeMaterialList()){
                boolean possui = false;
                for (FichaEvolAtividadeMaterial newEv : fichaEvolucao.getFichaEvolAtividadeMaterialList()){
                    if(oldEv.equals(newEv) && newEv.getFxatId() != null){
                        possui = true;
                    }
                }
                if(!possui){
                    evolAtividadeMaterial.remove(oldEv.getFxatId());
                }
            }
        }
         return fichaEvolService.salva(fichaEvolucao);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removeFichaEvol")
    public ResponseEntity<FichaEvolucao> removeFichaEvol(@RequestParam Integer evolId){
        try{
            fichaEvolService.remove(evolId);
            return new ResponseEntity<>(new FichaEvolucao(), HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(new FichaEvolucao(), HttpStatus.FORBIDDEN);
        }
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaFichaEvol")
    public ResponseEntity<List<FichaEvolucao>> pesquisaFichaEvol(@RequestParam (required=false) Integer evolId ){
        return fichaEvolService.pesquisa(evolId);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastraAvalFisioter")
    public ResponseEntity<?> cadastrarAvalFisioter(@RequestBody AvalFisioter avalFisioter){
        return avalFisioterService.salva(avalFisioter);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removeAvalFisioter")
    public ResponseEntity<AvalFisioter> removeAvalFisioter(@RequestParam Integer aftId){
        try{
            avalFisioterService.remove(aftId);
            return new ResponseEntity<>(new AvalFisioter(), HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(new AvalFisioter(), HttpStatus.FORBIDDEN);
        }
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaAvalFisioter")
    public ResponseEntity<List<AvalFisioter>> pesquisaAvalFisioter(@RequestParam (required=false) Integer aftId ){
        return avalFisioterService.pesquisa();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastraAvalSocioEcon")
    public ResponseEntity<?> cadastrarAvalSocioEcon(@RequestBody AvalSocioecon avalSocioEcon){
        return avalSocioeconService.salva(avalSocioEcon);
    }
    @CrossOrigin(origins = "*")
    @DeleteMapping("/removeAvalSocioEcon")
    public ResponseEntity<AvalSocioecon> removerAvalSocioEcon(@RequestParam Integer aseId){
        try{
            avalSocioeconService.remove(aseId);
            return new ResponseEntity<>(new AvalSocioecon(), HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(new AvalSocioecon(), HttpStatus.FORBIDDEN);
        }
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

        JsonElement documentos = jsonConvertido.get("documentosList");
        inserirNovoDocumento(documentos, novoPraticante);

        JsonElement responsaveis = jsonConvertido.get("responsaveis");
        inserirNovoResponsavel(responsaveis, novoPraticante);

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

        JsonElement documentos = jsonConvertido.get("documentosList");
        inserirNovoDocumento(documentos, praticanteExistente);

        JsonElement responsaveis = jsonConvertido.get("responsaveis");
        inserirNovoResponsavel(responsaveis, praticanteExistente);

        praticanteExistente = praticanteService.salva(praticanteExistente);

        return new ResponseEntity<Praticante>(praticanteExistente, HttpStatus.OK);
    }

    private void inserirNovoDocumento(JsonElement documentos, Praticante praticante){
        if(!documentos.isJsonNull()){
            JsonArray documentosArray = documentos.getAsJsonArray();
            int tamanhoDocs = documentosArray.size();

            for (int i = 0; i < tamanhoDocs; i++){
                Documentos docs = new Documentos();
                JsonElement docId = documentosArray.get(i).getAsJsonObject().get("docId");
                docs.setDocId(!docId.isJsonNull() ? docId.getAsInt() : null);
                docs.setPraticante(praticante);
                docs.setDocDescricao(documentosArray.get(i).getAsJsonObject().get("docDescricao").getAsString());
                docs.setDocDocumento(documentosArray.get(i).getAsJsonObject().get("docDocumento").getAsString());
                praticante.getDocumentosList().add(docs);
            }
        }
    }

    private void inserirNovoResponsavel(JsonElement responsaveis, Praticante praticante){
        if(!responsaveis.isJsonNull()){
            JsonArray responsaveisArray = responsaveis.getAsJsonArray();
            int tamanhoResponsaveis = responsaveisArray.size();

            for (int i = 0; i < tamanhoResponsaveis; i++){
                PraticanteResponsavel pxr = new PraticanteResponsavel();
                JsonElement pxrId = responsaveisArray.get(i).getAsJsonObject().get("pxrId");
                pxr.setPxrId(!pxrId.isJsonNull() ? pxrId.getAsInt() : null);
                pxr.setPraticante(praticante);
                pxr.setResponsavel(new Gson().fromJson(responsaveisArray.get(i).getAsJsonObject().get("responsavel"), Responsavel.class));
                pxr.setPxrTipoResp(responsaveisArray.get(i).getAsJsonObject().get("pxrTipoResp").getAsString());
                praticante.getResponsaveis().add(pxr);
            }
        }
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removerDocumento")
    public ResponseEntity<Documentos> pesquisaPraticantes(@RequestParam (required=false) Integer docId){
        try{
            documentosService.remove(docId);
            return new ResponseEntity<>(new Documentos(), HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(new Documentos(), HttpStatus.FORBIDDEN);
        }
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removerResponsavelSelecionado")
    public ResponseEntity<PraticanteResponsavel> removerResponsavelSelecionado(@RequestParam (required=false) Integer pxrId){
        try{
            praticanteResponsavelService.remove(pxrId);
            return new ResponseEntity<>(new PraticanteResponsavel(), HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(new PraticanteResponsavel(), HttpStatus.FORBIDDEN);
        }
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

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaResponsavel")
    public ResponseEntity<List<Responsavel>> pesquisaResponsavel(@RequestParam (required=false) String pesCpf,@RequestParam (required=false) String pesNome){
        return responsavelService.pesquisaResponsavel(pesCpf, pesNome);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaFuncionario")
    public ResponseEntity<List<Funcionario>> pesquisaFuncionario(@RequestParam (required=false) String pesCpf,@RequestParam (required=false) String pesNome){
        return funcionarioService.pesquisaFuncionario(pesCpf, pesNome);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaLogradouros")
    public ResponseEntity<List<Logradouro>> pesquisaLogradouros(@RequestParam (required=false) String logDesc) {
        List<Logradouro> logradouros = logradouroService.getLogradouroByDescricao(logDesc);
        return new ResponseEntity<List<Logradouro>>(logradouros, HttpStatus.OK);

    }

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastraLogradouro")
    public ResponseEntity<?> cadastrarLogradouro(@RequestBody Logradouro logradouro){
        return logradouroService.salva(logradouro);
    }
    @CrossOrigin(origins = "*")
    @DeleteMapping("/removeLogradouro")
    public ResponseEntity<Logradouro> removerLogradouro(@RequestParam Integer logId){
        try{
            Logradouro logradouro = logradouroService.remove(logId);
            return new ResponseEntity<>(logradouro, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(new Logradouro(), HttpStatus.FORBIDDEN);
        }

    }

    //MONTARIA

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastraMontaria")
    public ResponseEntity<?> cadastrarMontaria(@RequestBody Montaria montaria){
        return montariaService.salva(montaria);
    }
    @CrossOrigin(origins = "*")
    @DeleteMapping("/removeMontaria")
    public ResponseEntity<Montaria> removerMontaria(@RequestParam Integer montId){
        try{
            Montaria montaria = montariaService.remove(montId);
            return new ResponseEntity<>(montaria, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(new Montaria(), HttpStatus.FORBIDDEN);
        }

    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaMontaria")
    public ResponseEntity<List<Montaria>> pesquisaMontaria(){
        return montariaService.pesquisa();
    }

    //BAIRRO

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastraBairro")
    public ResponseEntity<?> cadastrarBairro(@RequestBody Bairro bairro){
        return bairroService.salva(bairro);
    }
    @CrossOrigin(origins = "*")
    @DeleteMapping("/removeBairro")
    public ResponseEntity<Bairro> removerBairro(@RequestParam Integer barId){
        try{
            Bairro bairro = bairroService.remove(barId);
            return new ResponseEntity<>(bairro, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(new Bairro(), HttpStatus.FORBIDDEN);
        }
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaBairro")
    public ResponseEntity<List<Bairro>> pesquisaBairro(@RequestParam (required=false) String barNome){
        return bairroService.pesquisa(barNome);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaCidade")
    public ResponseEntity<List<Cidade>> pesquisaCidade(@RequestParam (required=false) String cidNome){
        return cidadeService.pesquisa(cidNome);
    }
}

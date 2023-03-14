package com.api.desafio.controller;

import com.api.desafio.model.*;
import com.api.desafio.service.*;
import com.api.desafio.model.Animal;
import com.api.desafio.model.AvalSocioecon;
import com.api.desafio.model.FichaEvolucao;
import com.api.desafio.model.Pessoa;
import com.api.desafio.service.AnimalService;
import com.api.desafio.service.FichaAnamneseService;
import com.api.desafio.service.AvalSocioeconService;
import com.api.desafio.service.FichaEvolService;
import com.api.desafio.service.PessoaService;
import com.api.desafio.service.ResponsavelService;
import com.api.desafio.utils.DateUtil;
import com.api.desafio.utils.ListUtil;
import com.api.desafio.utils.RelatorioUtil;
import com.api.desafio.utils.StringUtil;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

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
    private MedicoService medicoService;
    @Autowired
    private AnexoAftService anexoAftService;
    @Autowired
    private DocumentosService documentosService;
    @Autowired
    private AvalFisioterService avalFisioterService;
    @Autowired
    private PraticanteResponsavelService praticanteResponsavelService;
    @Autowired
    private TelefoneService telefoneService;
    @Autowired
    private AgendamentoService agendamentoService;
    @Autowired
    private FichaAnamneseService fichaAnamneseService;

    @CrossOrigin(origins = "*")
    @GetMapping("/login")
    public ResponseEntity<?> getAuthenticate(@RequestParam String login, @RequestParam String password) {
        if (login == null || login.isEmpty() || password == null || password.isEmpty()) {
            return new ResponseEntity<Pessoa>(new Pessoa(), HttpStatus.BAD_REQUEST);
        }

        Pessoa pessoa = pessoaService.getPessoaByPesCpf(login);
        if (pessoa == null) {
            return new ResponseEntity<Pessoa>(new Pessoa(), HttpStatus.NOT_FOUND);
        }

        String encryptPassword = DigestUtils.md5Hex(password);
        if (pessoa.getPesLoginPassword().equals(encryptPassword)) {
            return new ResponseEntity<Pessoa>(pessoa, HttpStatus.OK);
        }

        return new ResponseEntity<Pessoa>(new Pessoa(), HttpStatus.NOT_FOUND);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pessoaLogada")
    public ResponseEntity<?> getPessoaLogada(@RequestParam Integer id) {
        if (id == null) {
            return new ResponseEntity<Pessoa>(new Pessoa(), HttpStatus.BAD_REQUEST);
        }

        Pessoa pessoa = pessoaService.getPessoaByPesId(id);
        if (pessoa == null) {
            return new ResponseEntity<Pessoa>(new Pessoa(), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Pessoa>(pessoa, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastraAnimal")
    public ResponseEntity<?> cadastrarAnimal(@RequestBody Animal animal) {
        return animalService.salva(animal);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removeAnimal")
    public ResponseEntity<Animal> removeAnimal(@RequestParam Integer aniId) {
        try {
            Animal animal = animalService.remove(aniId);
            return new ResponseEntity<>(new Animal(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new Animal(), HttpStatus.FORBIDDEN);
        }
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaAnimal")
    public ResponseEntity<List<Animal>> pesquisaAnimais(@RequestParam(required = false) Integer aniId, @RequestParam(required = false) String aniNome) {
        return animalService.pesquisaAnimais(aniId, aniNome);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastraAtividade")
    public ResponseEntity<?> cadastrarAtividade(@RequestBody Atividade atividade) {
        return atividadeService.salva(atividade);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removeAtividade")
    public ResponseEntity<?> removeAtividade(@RequestParam Integer atvId) {
        try {
            atividadeService.remove(atvId);
            return new ResponseEntity<>(new Atividade(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new Atividade(), HttpStatus.FORBIDDEN);
        }
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaAtividade")
    public ResponseEntity<List<Atividade>> pesquisaAtividade(@RequestParam(required = false) Integer atvId, @RequestParam(required = false) String atvDescricao) {
        return atividadeService.pesquisa(atvId, atvDescricao);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastraCargo")
    public ResponseEntity<?> cadastrarCargo(@RequestBody Cargo cargo) {
        return cargoService.salva(cargo);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removeCargo")
    public ResponseEntity<?> removeCargo(@RequestParam Integer carId) {
        try {
            cargoService.remove(carId);
            return new ResponseEntity<>(new Cargo(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new Cargo(), HttpStatus.FORBIDDEN);
        }
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaCargo")
    public ResponseEntity<List<Cargo>> pesquisaCargo(@RequestParam(required = false) Integer carId, @RequestParam(required = false) String carDescricao) {
        return cargoService.pesquisa(carId, carDescricao);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastraMaterial")
    public ResponseEntity<?> cadastrarMaterial(@RequestBody Material material) {
        return materialService.salva(material);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removeMaterial")
    public ResponseEntity<?> removeMaterial(@RequestParam Integer matId) {
        try {
            materialService.remove(matId);
            return new ResponseEntity<>(new Material(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new Material(), HttpStatus.FORBIDDEN);
        }
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaMaterial")
    public ResponseEntity<List<Material>> pesquisaMaterial(@RequestParam(required = false) Integer matId, @RequestParam(required = false) String matDescricao) {
        return materialService.pesquisa(matId, matDescricao);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastraPicadeiro")
    public ResponseEntity<?> cadastrarPicadeiro(@RequestBody Picadeiro picadeiro) {
        return picadeiroService.salva(picadeiro);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removePicadeiro")
    public ResponseEntity<Picadeiro> removePicadeiro(@RequestParam Integer picId) {
        try {
            picadeiroService.remove(picId);
            return new ResponseEntity<>(new Picadeiro(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new Picadeiro(), HttpStatus.FORBIDDEN);
        }
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaPicadeiro")
    public ResponseEntity<List<Picadeiro>> pesquisaPicadeiro(@RequestParam(required = false) Integer picId, @RequestParam(required = false) String picDescricao) {
        return picadeiroService.pesquisa(picId, picDescricao);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaPais")
    public Pais pesquisaPais(@RequestParam String paiIso) {
        return paisService.getPaisByIso(paiIso);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/buscaListaPaises")
    public List<Pais> pesquisaListaPaises() {
        List<Pais> paises = paisService.getPaises();
        return paises;
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastraFichaEvol")
    public ResponseEntity<FichaEvolucao> cadastrarFichaEvol(@RequestBody FichaEvolucao fichaEvolucao) {
        if (fichaEvolucao.getEvolId() != null) {
            FichaEvolucao evol = fichaEvolService.pesquisaPorCodigo(fichaEvolucao.getEvolId());
            for (FichaEvolAtividadeMaterial oldEv : evol.getFichaEvolAtividadeMaterialList()) {
                boolean possui = false;
                for (FichaEvolAtividadeMaterial newEv : fichaEvolucao.getFichaEvolAtividadeMaterialList()) {
                    if (oldEv.equals(newEv) && newEv.getFxatId() != null) {
                        possui = true;
                    }
                }
                if (!possui) {
                    evolAtividadeMaterial.remove(oldEv.getFxatId());
                }
            }
        }
        return fichaEvolService.salva(fichaEvolucao);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removeFichaEvol")
    public ResponseEntity<FichaEvolucao> removeFichaEvol(@RequestParam Integer evolId) {
        try {
            fichaEvolService.remove(evolId);
            return new ResponseEntity<>(new FichaEvolucao(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new FichaEvolucao(), HttpStatus.FORBIDDEN);
        }
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaFichaEvol")
    public ResponseEntity<List<FichaEvolucao>> pesquisaFichaEvol(@RequestParam(required = false) Integer evolId, @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date evolData, @RequestParam(required = false) Integer pratId) {
        return fichaEvolService.pesquisa(evolId, evolData, pratId);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastraFichaAnamnese")
    public ResponseEntity<FichaAnamnese> cadastrarFichaAnamnese(@RequestBody FichaAnamnese fichaAnamnese) {
        for (AnexoAmn anex : fichaAnamnese.getAnexosList()) {
            if (anex.getFichaAnamnese() == null) {
                anex.setFichaAnamnese(fichaAnamnese);
            }
        }
        Date date = fichaAnamnese.getAmnData();
        date.setTime(date.getTime() + ((4 * 60 * 60) * 1000));
        fichaAnamnese.setAmnData(date);
        return fichaAnamneseService.salva(fichaAnamnese);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removeFichaAnamnese")
    public ResponseEntity<FichaAnamnese> removeFichaAnamnese(@RequestParam Integer amnId) {
        try {
            fichaAnamneseService.remove(amnId);
            return new ResponseEntity<>(new FichaAnamnese(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new FichaAnamnese(), HttpStatus.FORBIDDEN);
        }
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaFichaAnamnese")
    public ResponseEntity<List<FichaAnamnese>> pesquisaFichaAnamnese(@RequestParam(required = false) Integer amnId, @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date amnData, @RequestParam(required = false) Integer pratId) {
        return fichaAnamneseService.pesquisa(amnId, amnData, pratId);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastraAvalFisioter")
    public ResponseEntity<?> cadastrarAvalFisioter(@RequestBody AvalFisioter avalFisioter) {
        for (AnexoAft anex : avalFisioter.getAnexosList()) {
            if (anex.getAvalFisioter() == null) {
                anex.setAvalFisioter(avalFisioter);
            }
        }
        Date date = avalFisioter.getAftData();
        date.setTime(date.getTime() + ((4 * 60 * 60) * 1000));
        avalFisioter.setAftData(date);
        return avalFisioterService.salva(avalFisioter);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removeAvalFisioter")
    public ResponseEntity<AvalFisioter> removeAvalFisioter(@RequestParam Integer aftId) {
        try {
            avalFisioterService.remove(aftId);
            return new ResponseEntity<>(new AvalFisioter(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new AvalFisioter(), HttpStatus.FORBIDDEN);
        }
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaAvalFisioter")
    public ResponseEntity<List<AvalFisioter>> pesquisaAvalFisioter(@RequestParam(required = false) Integer aftId) {
        return avalFisioterService.pesquisa();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastraAvalSocioEcon")
    public ResponseEntity<?> cadastrarAvalSocioEcon(@RequestBody AvalSocioecon avalSocioEcon) {
        return avalSocioeconService.salva(avalSocioEcon);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastrarAgendamento")
    public ResponseEntity<?> cadastrarAgendamento(@RequestBody Agendamento agendamento) {

            List<Agendamento> agendamentosDataHora  = agendamentoService.pesquisaAgendamentosDiferetesDeDaMesmaDataEHora(agendamento.getAgdId(), agendamento.getAgdData(), agendamento.getAgdHora());
            if (ListUtil.isNotEmpty(agendamentosDataHora)) {
                Agendamento agendamentoJaRealizado = agendamentosDataHora.get(0);
                return ResponseEntity
                        .status(HttpStatus.ALREADY_REPORTED)
                        .body(String.format("Para essa data e hora existe um agendamento para o praticante %s", agendamentoJaRealizado.getPraticante().getPessoa().getPesNome()));
            }

            agendamentosDataHora = agendamentoService.pesquisaAgendamentosByAgdDataAndAgdHoraAndExistsAnimal(agendamento.getAgdData(), agendamento.getAgdHora(), agendamento.getAgdId(), agendamento.getAnimalList());
            if (ListUtil.isNotEmpty(agendamentosDataHora)) {
                Agendamento agendamentoJaRealizado = agendamentosDataHora.get(0);
                List<String> animaisString = agendamentoJaRealizado.getAnimalList().stream().map(ani -> ani.getAniNome()).collect(Collectors.toList());
                return ResponseEntity
                        .status(HttpStatus.ALREADY_REPORTED)
                        .body(String.format("Para essa data e hora existe um agendamento para o praticante %s com os animais %s", agendamentoJaRealizado.getPraticante().getPessoa().getPesNome(), StringUtil.join(animaisString, ", ")));
            }
            agendamentosDataHora = agendamentoService.pesquisaAgendamentosByAgdDataAndAgdHoraAndExistsFuncionario(agendamento.getAgdData(), agendamento.getAgdHora(), agendamento.getAgdId(), agendamento.getFuncionarioList());
            if (ListUtil.isNotEmpty(agendamentosDataHora)) {
                Agendamento agendamentoJaRealizado = agendamentosDataHora.get(0);
                List<String> funcionariosString = agendamentoJaRealizado.getFuncionarioList().stream().map(func -> func.getPessoa().getPesNome()).collect(Collectors.toList());
                return ResponseEntity
                        .status(HttpStatus.ALREADY_REPORTED)
                        .body(String.format("Para essa data e hora existe um agendamento para o praticante %s com os funcionários %s", agendamentoJaRealizado.getPraticante().getPessoa().getPesNome(), StringUtil.join(funcionariosString, ", ")));
            }
            agendamentosDataHora = agendamentoService.pesquisaAgendamentosByAgdDataAndAgdHoraAndExistsMaterial(agendamento.getAgdData(), agendamento.getAgdHora(), agendamento.getAgdId(), agendamento.getMaterialList());
            if (ListUtil.isNotEmpty(agendamentosDataHora)) {
                Agendamento agendamentoJaRealizado = agendamentosDataHora.get(0);
                List<String> materialString = agendamentoJaRealizado.getMaterialList().stream().map(mat -> mat.getMatDescricao()).collect(Collectors.toList());
                return ResponseEntity
                        .status(HttpStatus.ALREADY_REPORTED)
                        .body(String.format("Para essa data e hora existe um agendamento para o praticante %s utilizando os materiais %s", agendamentoJaRealizado.getPraticante().getPessoa().getPesNome(), StringUtil.join(materialString, ", ")));
            }

        agendamento = agendamentoService.salva(agendamento);
        if (agendamento != null) {
            return new ResponseEntity<>(agendamento, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new Agendamento(), HttpStatus.FORBIDDEN);
        }
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removerAgendamento")
    public ResponseEntity<?> removerAgendamento(@RequestParam Integer agdId) {
        try {
            agendamentoService.remove(agdId);
            return new ResponseEntity<>(new Agendamento(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new Agendamento(), HttpStatus.FORBIDDEN);
        }
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaAgendamentos")
    public ResponseEntity<List<Agendamento>> pesquisaAgendamentos(@RequestParam(required = false) Integer pratId, @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date agdData, @RequestParam(required = false) @DateTimeFormat(pattern = "HH:mm") Date agdHora, @RequestParam(required = false) boolean agdConcluido) {
        return agendamentoService.pesquisaAgendamentos(pratId, agdData, agdHora, agdConcluido);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removeAvalSocioEcon")
    public ResponseEntity<AvalSocioecon> removerAvalSocioEcon(@RequestParam Integer aseId) {
        try {
            avalSocioeconService.remove(aseId);
            return new ResponseEntity<>(new AvalSocioecon(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new AvalSocioecon(), HttpStatus.FORBIDDEN);
        }
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaAvalSocioEcon")
    public ResponseEntity<List<AvalSocioecon>> pesquisaAvalSocioEcon() {
        return avalSocioeconService.pesquisa();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastrarPraticante")
    public ResponseEntity<Praticante> cadastrarPraticante(@RequestBody Praticante praticante) {
        boolean adicionando = praticante.getPratId() == null;

        Pessoa pessoa = null;
        if (adicionando) {
            pessoa = pessoaService.getPessoaByPesCpf(praticante.getPessoa().getPesCpf());
            if (pessoa != null) {
                return new ResponseEntity<Praticante>(new Praticante(), HttpStatus.BAD_REQUEST);
            }
        }

        praticante.getPessoa().getTelefoneList().forEach(tel -> tel.setPessoa(praticante.getPessoa()));
        praticante.getResponsaveis().forEach(resp -> resp.setPraticante(praticante));
        praticante.getDocumentosList().forEach(doc -> doc.setPraticante(praticante));

        pessoaService.salva(praticante.getPessoa());
        return new ResponseEntity<Praticante>(praticanteService.salva(praticante),HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removerDocumento")
    public ResponseEntity<Documentos> removerDocumento(@RequestParam(required = false) Integer docId) {
        try {
            documentosService.remove(docId);
            return new ResponseEntity<>(new Documentos(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new Documentos(), HttpStatus.FORBIDDEN);
        }
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removerTelefone")
    public ResponseEntity<Telefone> removerTelefone(@RequestParam(required = false) Integer telId) {
        try {
            telefoneService.remove(telId);
            return new ResponseEntity<>(new Telefone(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new Telefone(), HttpStatus.FORBIDDEN);
        }
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removerResponsavelSelecionado")
    public ResponseEntity<PraticanteResponsavel> removerResponsavelSelecionado(@RequestParam(required = false) Integer pxrId) {
        try {
            praticanteResponsavelService.remove(pxrId);
            return new ResponseEntity<>(new PraticanteResponsavel(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new PraticanteResponsavel(), HttpStatus.FORBIDDEN);
        }
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaPraticantes")
    public ResponseEntity<List<Praticante>> pesquisaPraticantes(@RequestParam(required = false) String pesCpf, @RequestParam(required = false) String pesNome, @RequestParam(required = false) Integer pratId) {
        return praticanteService.pesquisaPraticantes(pesCpf, pesNome, pratId);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removePraticante")
    public ResponseEntity<Praticante> removePraticante(@RequestParam(required = false) Integer pratId) {
        try {
            praticanteService.remove(pratId);
            return new ResponseEntity<>(new Praticante(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new Praticante(), HttpStatus.FORBIDDEN);
        }
    }

    ///////////////////////////////////////////
    @CrossOrigin(origins = "*")
    @PostMapping("/cadastrarResponsavel")
    public ResponseEntity<Responsavel> cadastrarResponsavel(@RequestBody Responsavel responsavel) {
        boolean adicionando = responsavel.getRespId() == null;

        Pessoa pessoa = null;
        if (adicionando) {
            pessoa = pessoaService.getPessoaByPesCpf(responsavel.getPessoa().getPesCpf());
            if (pessoa != null) {
                return new ResponseEntity<Responsavel>(new Responsavel(), HttpStatus.BAD_REQUEST);
            }
        }

        responsavel.getPessoa().getTelefoneList().forEach(tel -> tel.setPessoa(responsavel.getPessoa()));

        pessoaService.salva(responsavel.getPessoa());
        return new ResponseEntity<Responsavel>(responsavelService.salva(responsavel),HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaMedico")
    public ResponseEntity<List<Medico>> pesquisaMedico(@RequestParam(required = false) String pesCpf, @RequestParam(required = false) String pesNome, @RequestParam(required = false) Integer medId) {
        return medicoService.pesquisaMedico(pesCpf, pesNome, medId);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/testeConexao")
    public boolean testeConexao() {
        return true;
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removeMedico")
    public ResponseEntity<Medico> removeMedico(@RequestParam(required = false) Integer medId) {
        try {
            medicoService.remove(medId);
            return new ResponseEntity<>(new Medico(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new Medico(), HttpStatus.FORBIDDEN);
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
                return new ResponseEntity<Medico>(new Medico(), HttpStatus.BAD_REQUEST);
            }
        }

        medico.getPessoa().getTelefoneList().forEach(tel -> tel.setPessoa(medico.getPessoa()));

        pessoaService.salva(medico.getPessoa());
        medicoService.salva(medico);
        return new ResponseEntity<Medico>(medico, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaResponsavel")
    public ResponseEntity<List<Responsavel>> pesquisaResponsavel(@RequestParam(required = false) String pesCpf, @RequestParam(required = false) String pesNome, @RequestParam(required = false) Integer respId) {
        return responsavelService.pesquisaResponsavel(pesCpf, pesNome, respId);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removeResponsavel")
    public ResponseEntity<Responsavel> removeResponsavel(@RequestParam Integer respId) {
        try {
            Responsavel responsavel = responsavelService.remove(respId);
            return new ResponseEntity<>(new Responsavel(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new Responsavel(), HttpStatus.FORBIDDEN);
        }
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaFuncionario")
    public ResponseEntity<List<Funcionario>> pesquisaFuncionario(@RequestParam(required = false) String pesCpf, @RequestParam(required = false) String pesNome, @RequestParam(required = false) Integer funcId) {
        return funcionarioService.pesquisaFuncionario(pesCpf, pesNome,funcId);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastrarFuncionario")
    public ResponseEntity<Funcionario> cadastrarFuncionario(@RequestBody Funcionario funcionario) {
        funcionario.getPessoa().getTelefoneList().forEach(tel -> tel.setPessoa(funcionario.getPessoa()));
        pessoaService.salva(funcionario.getPessoa());
        return new ResponseEntity<Funcionario>(funcionarioService.salva(funcionario),HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaLogradouros")
    public ResponseEntity<List<Logradouro>> pesquisaLogradouros(@RequestParam(required = false) String logDesc, @RequestParam(required = false) Integer logId) {
        List<Logradouro> logradouros = logradouroService.getLogradouroByDescricaoAndId(logDesc, logId);
        return new ResponseEntity<List<Logradouro>>(logradouros, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastraLogradouro")
    public ResponseEntity<?> cadastrarLogradouro(@RequestBody Logradouro logradouro) {
        return logradouroService.salva(logradouro);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removeLogradouro")
    public ResponseEntity<Logradouro> removerLogradouro(@RequestParam Integer logId) {
        try {
            Logradouro logradouro = logradouroService.remove(logId);
            return new ResponseEntity<>(logradouro, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new Logradouro(), HttpStatus.FORBIDDEN);
        }

    }

    //MONTARIA

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastraMontaria")
    public ResponseEntity<?> cadastrarMontaria(@RequestBody Montaria montaria) {
        return montariaService.salva(montaria);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removeMontaria")
    public ResponseEntity<Montaria> removerMontaria(@RequestParam Integer montId) {
        try {
            Montaria montaria = montariaService.remove(montId);
            return new ResponseEntity<>(montaria, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new Montaria(), HttpStatus.FORBIDDEN);
        }

    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaMontaria")
    public ResponseEntity<List<Montaria>> pesquisaMontaria(@RequestParam(required = false) Integer montId, @RequestParam(required = false) String montDescricao) {
        return montariaService.pesquisa(montId, montDescricao);
    }

    //BAIRRO

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastraBairro")
    public ResponseEntity<?> cadastrarBairro(@RequestBody Bairro bairro) {
        return bairroService.salva(bairro);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/removeBairro")
    public ResponseEntity<Bairro> removerBairro(@RequestParam Integer barId) {
        try {
            Bairro bairro = bairroService.remove(barId);
            return new ResponseEntity<>(bairro, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new Bairro(), HttpStatus.FORBIDDEN);
        }
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaBairro")
    public ResponseEntity<List<Bairro>> pesquisaBairro(@RequestParam(required = false) String barNome, @RequestParam(required = false) Integer barId) {
        return bairroService.pesquisa(barNome, barId);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaCidade")
    public ResponseEntity<List<Cidade>> pesquisaCidade(@RequestParam(required = false) String cidNome, Integer cidId) {
        return cidadeService.pesquisa(cidNome, cidId);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/pesquisaAgendamentosAtivos")
    public ResponseEntity<List<Agendamento>> pesquisaAgendamentosAtivos() {
        return agendamentoService.pesquisaAgendamentosAtivos();
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/relatorioFuncionarios")
    public ResponseEntity<byte[]> gerarRelatorioFuncionarios(@RequestBody String jsonParams) {
        JsonObject jsonConvertido = new Gson().fromJson(jsonParams, JsonObject.class);
        List<Funcionario> funcionarios = funcionarioService.pesquisaFuncionario("", "", null).getBody();
        return RelatorioUtil.gerarRelatorios(jsonConvertido, funcionarios);
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/relatorioFichaEvolucao")
    public ResponseEntity<byte[]> gerarRelatorioFichaEvolucao(@RequestBody String jsonParams) {
        JsonObject jsonConvertido = new Gson().fromJson(jsonParams, JsonObject.class);
        JsonObject filtros = jsonConvertido.get("filtros").getAsJsonObject();
        Date dataIni = DateUtil.newDate(filtros.get("dataIni").getAsString());
        Date dataFim = DateUtil.newDate(filtros.get("dataFim").getAsString());
        Integer pratId = RelatorioUtil.getParamInteger(filtros,"pratId");
        List<FichaEvolucao> fichaEvol = fichaEvolService.pesquisaRelatorio(dataIni, dataFim, pratId).getBody();
        return RelatorioUtil.gerarRelatorios(jsonConvertido, fichaEvol);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastrarPessoa")
    public ResponseEntity<?> cadastrarPessoa(@RequestBody Pessoa pessoa) {
        pessoa.getTelefoneList().forEach(tel -> tel.setPessoa(pessoa));
        return new ResponseEntity<>(pessoaService.salva(pessoa), HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/encriptarSenha")
    public String encriptarSenha(@RequestParam String senha) {
        String encryptPassword = DigestUtils.md5Hex(senha);
        return encryptPassword;
    }
}

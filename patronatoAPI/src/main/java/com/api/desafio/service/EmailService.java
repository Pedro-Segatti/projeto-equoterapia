package com.api.desafio.service;

import com.api.desafio.crudFiles.AgendamentoCrud;
import com.api.desafio.crudFiles.ConfiguracoesCrud;
import com.api.desafio.model.Agendamento;
import com.api.desafio.model.Animal;
import com.api.desafio.model.Configuracoes;
import com.api.desafio.model.Funcionario;
import com.api.desafio.utils.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.internet.MimeMessage;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class EmailService implements EmailInterface {

    private static final int COMUNICOU_5_AND_10 = 2;
    private static final int COMUNICOU_15_AND_30 = 1;

    @Autowired
    private AgendamentoCrud agendamentoCrud;
    @Autowired
    private ConfiguracoesCrud configuracoesCrud;

    private JavaMailSenderImpl mailSender = new JavaMailSenderImpl();

    public void enviarEmail(Email email, Configuracoes configuracoes) {
        if (configuracoes == null) {
            return;
        }

        if (StringUtil.nullOrEmpty(configuracoes.getConfEmail())) {
            return;
        }

        if (StringUtil.nullOrEmpty(configuracoes.getConfEmailPassword())) {
            return;
        }

        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);
        mailSender.setUsername(configuracoes.getConfEmail());
        mailSender.setPassword(configuracoes.getConfEmailPassword());

        Properties properties = new Properties();
        properties.setProperty("mail.smtp.auth", "true");
        properties.setProperty("mail.smtp.starttls.enable", "true");
        properties.setProperty("mail.mime.charset", "utf-8");
        properties.setProperty("mail.smtp.allow8bitmime", "true");

        mailSender.setJavaMailProperties(properties);

        if (StringUtil.nullOrEmpty(email.getMensagem())) {
            return;
        }

        if (ListUtil.isEmpty(email.getDestinatarios())) {
            return;
        }

        try {
            MimeMessage mensagem = mailSender.createMimeMessage();
            MimeMessageHelper mensagemHtml = new MimeMessageHelper(mensagem);
            mensagemHtml.setSubject(email.getAssunto());
            mensagemHtml.setFrom(mailSender.getUsername());
            String[] destinatarios = email.getDestinatarios().stream().toArray(String[]::new);
            mensagemHtml.setTo(destinatarios);
            mensagemHtml.setText(email.getMensagem(), true);

            mailSender.send(mensagem);
        }

        catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void enviarEmail(List<Agendamento> agendamentos, Configuracoes configuracoes, int tipo) {
        if (ListUtil.isEmpty(agendamentos)) {
            return;
        }

        for (Agendamento agendamento : agendamentos) {
            Set<String> emailDestinatarios = new HashSet<>();
            Set<String> emailFuncionarios = agendamento.getFuncionarioList()
                    .stream()
                    .filter(func -> func.getPessoa().getEmail() != null)
                    .map(func -> func.getPessoa().getEmail()).collect(Collectors.toSet());

            emailDestinatarios.addAll(emailFuncionarios);
            String emailPraticante = agendamento.getPraticante().getPessoa().getEmail();
            if (StringUtil.notNullOrEmpty(emailPraticante)){
                emailDestinatarios.add(emailPraticante);
            }
            List<String> emailDestinatariosList = emailDestinatarios.stream().collect(Collectors.toList());

            if (ListUtil.isEmpty(emailDestinatariosList)){
                continue;
            }

            List<String> nomeCavalos = agendamento.getAnimalList().stream().map(Animal::getAniNome).collect(Collectors.toList());
            List<String> nomeProfissionais = agendamento.getFuncionarioList().stream().map(funcionario -> funcionario.getPessoa().getPesNome()).collect(Collectors.toList());

            for (String email : emailDestinatariosList) {
                Map<String, String> mapVars = new HashMap<>();
                mapVars.put("[Nome do Destinatario]", agendamento.getPraticante().getPessoa().getPesNome());
                mapVars.put("[Data]", agendamento.getAgdDataFormatada());
                mapVars.put("[Hora]", agendamento.getAgdHoraFormatada());
                mapVars.put("[Animais]", StringUtil.join(nomeCavalos, ", "));
                mapVars.put("[Profissionais]", StringUtil.join(nomeProfissionais, ", "));

                String corpoEmail = StringUtil.replaceTextVars(mapVars, configuracoes.getConfEmailCorpo());

                Email emailtoSend = new Email();
                emailtoSend.setAssunto("Agendamento em Breve");
                emailtoSend.setDestinatarios(List.of(email));
                emailtoSend.setMensagem(corpoEmail);

                enviarEmail(emailtoSend, configuracoes);
            }

            agendamento.setAgdComunicou1(true);
            if (isComunicou5and10(tipo)) {
                agendamento.setAgdComunicou2(true);
            }

            agendamentoCrud.save(agendamento);
        }
    }

    public boolean isComunicou5and10(int tipo) {
        return COMUNICOU_5_AND_10 == tipo;
    }

    @Scheduled(fixedRate = 60000)
    @Transactional
    public void reportCurrentTime15and30() {
        List<Agendamento> agendamentos = agendamentoCrud.findAgendamentosNext15and30minutes();
        Configuracoes configuracoes = configuracoesCrud.findByConfId(1);
        enviarEmail(agendamentos, configuracoes, COMUNICOU_15_AND_30);
    }

    @Scheduled(fixedRate = 30000)
    @Transactional
    public void reportCurrentTime5and10() {
        List<Agendamento> agendamentos = agendamentoCrud.findAgendamentosNext5and10minutes();
        Configuracoes configuracoes = configuracoesCrud.findByConfId(1);
        enviarEmail(agendamentos, configuracoes, COMUNICOU_5_AND_10);
    }
}
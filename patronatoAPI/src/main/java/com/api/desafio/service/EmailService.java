package com.api.desafio.service;

import com.api.desafio.crudFiles.AgendamentoCrud;
import com.api.desafio.crudFiles.ConfiguracoesCrud;
import com.api.desafio.model.Agendamento;
import com.api.desafio.model.Configuracoes;
import com.api.desafio.utils.Email;
import com.api.desafio.utils.EmailInterface;
import com.api.desafio.utils.ListUtil;
import com.api.desafio.utils.StringUtil;
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

    @Scheduled(fixedRate = 15000)
    @Transactional
    public void reportCurrentTime() {
        List<Agendamento> agendamentos = agendamentoCrud.findAgendamentosNext15and30minutes();
        Configuracoes configuracoes = configuracoesCrud.findByConfId(1);
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
            List<String> emailDestinatariosList = emailDestinatarios.stream().toList();

            if (ListUtil.isEmpty(emailDestinatariosList)){
                continue;
            }

            Email email = new Email();
            email.setAssunto("Agendamento em Breve");
            email.setDestinatarios(emailDestinatariosList);
            email.setMensagem("<b>OIIIIII BRO</b> <br /> <p>Salve Gau</p>");

            enviarEmail(email, configuracoes);
        }
    }
}
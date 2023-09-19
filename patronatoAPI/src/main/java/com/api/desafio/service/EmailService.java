package com.api.desafio.service;

import com.api.desafio.crudFiles.AgendamentoCrud;
import com.api.desafio.model.Agendamento;
import com.api.desafio.utils.Email;
import com.api.desafio.utils.EmailInterface;
import com.api.desafio.utils.ListUtil;
import com.api.desafio.utils.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.internet.MimeMessage;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class EmailService implements EmailInterface {

    @Autowired
    private AgendamentoCrud agendamentoCrud;

    private JavaMailSenderImpl mailSender = new JavaMailSenderImpl();

    public String enviarEmail(Email email) {
        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);
        mailSender.setUsername("segattipedroh@gmail.com");
        mailSender.setPassword("aoruybazsxkuaccd");

        Properties properties = new Properties();
        properties.setProperty("mail.smtp.auth", "true");
        properties.setProperty("mail.smtp.starttls.enable", "true");

        mailSender.setJavaMailProperties(properties);

        if (StringUtil.nullOrEmpty(email.getMensagem())) {
            return "Error";
        }

        if (ListUtil.isEmpty(email.getDestinatarios())) {
            return "Error";
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
            return "Mail Sent Successfully...";
        }

        catch (Exception e) {
            e.printStackTrace();
            return "Error while Sending Mail";
        }
    }

    @Scheduled(fixedRate = 15000)
    @Transactional
    public void reportCurrentTime() {
        List<Agendamento> agendamentos = agendamentoCrud.findAgendamentosNext15and30minutes();
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
            email.setMensagem("<b>OIIIIII MOAA NOITIII</b> <br /> <p>Salve Gau</p>");

            enviarEmail(email);
        }
    }
}
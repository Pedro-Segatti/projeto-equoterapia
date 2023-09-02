package com.api.desafio.service;

import com.api.desafio.utils.Email;
import com.api.desafio.utils.EmailInterface;
import com.api.desafio.utils.ListUtil;
import com.api.desafio.utils.StringUtil;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.mail.internet.MimeMessage;
import java.util.Properties;

@Component
public class EmailService implements EmailInterface {

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
            mensagemHtml.setTo(StringUtil.join(email.getDestinatarios(), ","));
            mensagemHtml.setText(email.getMensagem(), true);

            mailSender.send(mensagem);
            return "Mail Sent Successfully...";
        }

        catch (Exception e) {
            e.printStackTrace();
            return "Error while Sending Mail";
        }
    }
}
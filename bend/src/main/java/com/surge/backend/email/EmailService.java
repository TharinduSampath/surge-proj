package com.surge.backend.email;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.util.DefaultUriBuilderFactory;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service @AllArgsConstructor @Slf4j
public class EmailService implements EmailSender{
    private final JavaMailSender mailSender;

    @Override @Async
    public void send(String to, String email) {
        try {
            MimeMessage mimeMsg = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMsg, "utf-8");
            helper.setText(email, true);
            helper.setTo(to);
            helper.setSubject("You have been invited! Please confirm your email");
            helper.setFrom("noreply@surge.proj.com");
            mailSender.send(mimeMsg);
        } catch (MessagingException e) {
            log.error("Failed to send email!", e);
            throw new IllegalStateException("Failed to send email!");
        }
    }
}

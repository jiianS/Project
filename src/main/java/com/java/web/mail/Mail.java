package com.java.web.mail;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class Mail {

	@Autowired
	private JavaMailSender mailSender;
	
	@RequestMapping(value = "/sendMail", method = RequestMethod.GET)
	public void sendMail(HttpServletRequest req, HttpServletResponse res) throws Exception {
		final String name = req.getParameter("con_name");
		final String mail = req.getParameter("con_mail");
		String comments = req.getParameter("con_comments");
		
		String to = "jiianiii1028@gmail.com";

		System.out.println(name);
		try {
			MimeMessage message = mailSender.createMimeMessage();
			MimeMessageHelper msgHelper = new MimeMessageHelper(message, true, "UTF-8");

			// Subject(메일 제목)
			msgHelper.setTo(to);
			msgHelper.setFrom(mail);
			msgHelper.setText(comments);
			msgHelper.setSubject("[" + name + "] 님이 보낸 메세지 입니다");

			// send the message
			mailSender.send(message);
			System.out.println("message sent successfully...");

		} catch (MessagingException e) {
			e.printStackTrace();
		}
	}

}

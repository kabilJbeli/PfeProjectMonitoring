package com.pfe.projectMonitoringBE.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pfe.projectMonitoringBE.interfaces.IEmail;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(value = "/email")
public class EmailController {

	@Autowired
	private IEmail service;
	
	@GetMapping("/sendEmail")
	public void sendEmail(@RequestParam String email) {	
		service.sendSimpleMessage(email, "Test Email", "Test description");
	}

}

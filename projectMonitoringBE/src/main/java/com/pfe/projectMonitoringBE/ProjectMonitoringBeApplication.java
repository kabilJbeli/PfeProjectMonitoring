package com.pfe.projectMonitoringBE;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.ulisesbocchio.jasyptspringboot.annotation.EnableEncryptableProperties;

@SpringBootApplication
@EnableConfigurationProperties
@EnableEncryptableProperties
public class ProjectMonitoringBeApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjectMonitoringBeApplication.class, args);
	}

}

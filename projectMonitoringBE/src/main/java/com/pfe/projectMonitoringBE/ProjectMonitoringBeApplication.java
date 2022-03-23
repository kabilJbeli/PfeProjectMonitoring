package com.pfe.projectMonitoringBE;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties
public class ProjectMonitoringBeApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjectMonitoringBeApplication.class, args);
	}

}

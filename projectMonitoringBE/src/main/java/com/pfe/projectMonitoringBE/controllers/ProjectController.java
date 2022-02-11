package com.pfe.projectMonitoringBE.controllers;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pfe.projectMonitoringBE.entities.Project;
import com.pfe.projectMonitoringBE.services.ProjectService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(value = "/project")
public class ProjectController {

	@Autowired
	private ProjectService service;

	@GetMapping("/all")
	public List<Project> getAll() {
		return service.getAllProject();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Project> getProjectById(@PathVariable Integer id) {
		try {
			Project project = service.findProject(id);
			return new ResponseEntity<Project>(project, HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<Project>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/add")
	public void addProject(@RequestBody Project project) {
		service.createOrUpdateProject(project);
	}

	@PutMapping("/update/{id}")
	public void updateProject(@RequestBody Project project) {
		try {
			Project searchedProject = service.findProject(project.getProjectID());
			if (searchedProject.getProjectID() != null) {
				service.createOrUpdateProject(project);
			}
		} catch (NoSuchElementException e) {

		}
	}

	@DeleteMapping("/delete/{id}")
	public void deleteProject(@PathVariable Integer id) {
		try {
			Project searchedProject = service.findProject(id);
			if (searchedProject.getProjectID() != null) {
				service.deleteProject(searchedProject);
			}
		} catch (NoSuchElementException e) {

		}
	}
}

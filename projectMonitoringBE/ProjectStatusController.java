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

import com.pfe.projectMonitoringBE.entities.ProjectStatus;
import com.pfe.projectMonitoringBE.services.ProjectStatusService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(value = "/projectStatus")
public class ProjectStatusController {

	@Autowired
	private ProjectStatusService service;

	@GetMapping("/all")
	public List<ProjectStatus> getAll() {
		return service.getAllProjectStatus();
	}

	@GetMapping("/{id}")
	public ResponseEntity<ProjectStatus> getProjectStatusById(@PathVariable Integer id) {
		try {
			ProjectStatus projectStatus = service.findProjectStatus(id);
			return new ResponseEntity<ProjectStatus>(projectStatus, HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<ProjectStatus>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/add")
	public void addProjectStatus(@RequestBody ProjectStatus projectStatus) {
		service.createOrUpdateProjectStatus(projectStatus);
	}

	@PutMapping("/update/{id}")
	public void updateProjectStatus(@RequestBody ProjectStatus projectStatus) {
		try {
			ProjectStatus searchedProjectStatus = service.findProjectStatus(projectStatus.getProjectStatusID());
			if (searchedProjectStatus.getProjectStatusID() != null) {
				service.createOrUpdateProjectStatus(projectStatus);
			}
		} catch (NoSuchElementException e) {

		}
	}

	@DeleteMapping("/delete/{id}")
	public void deleteProjectStatus(@PathVariable Integer id) {
		try {
			ProjectStatus searchedProjectStatus = service.findProjectStatus(id);
			if (searchedProjectStatus.getProjectStatusID() != null) {
				service.deleteProjectStatus(searchedProjectStatus);
			}
		} catch (NoSuchElementException e) {

		}
	}
}

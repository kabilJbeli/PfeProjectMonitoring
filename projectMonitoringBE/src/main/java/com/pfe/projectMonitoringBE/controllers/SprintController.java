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

import com.pfe.projectMonitoringBE.entities.Sprint;
import com.pfe.projectMonitoringBE.interfaces.ISprint;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(value = "/sprint")
public class SprintController {

	@Autowired
	private ISprint service;

	@GetMapping("/all")
	public List<Sprint> getAll() {
		return service.getAllSprint();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Sprint> getSprintById(@PathVariable Integer id) {
		try {
			Sprint sprint = service.findSprint(id);
			return new ResponseEntity<Sprint>(sprint, HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<Sprint>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/add")
	public void addSprint(@RequestBody Sprint sprint) {
		service.createOrUpdateSprint(sprint);
	}

	@PutMapping("/update/{id}")
	public void updateSprint(@RequestBody Sprint sprint) {
		try {
			Sprint searchedSprint = service.findSprint(sprint.getSprintID());
			if (searchedSprint.getSprintID() != null) {
				service.createOrUpdateSprint(sprint);
			}
		} catch (NoSuchElementException e) {

		}
	}

	@DeleteMapping("/delete/{id}")
	public void deleteSprint(@PathVariable Integer id) {
		try {
			Sprint sprint = service.findSprint(id);
			if (sprint.getSprintID() != null) {
				service.deleteSprint(sprint);
			}
		} catch (NoSuchElementException e) {

		}
	}
	
}

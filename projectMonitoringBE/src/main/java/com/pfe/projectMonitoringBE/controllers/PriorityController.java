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

import com.pfe.projectMonitoringBE.entities.Priority;
import com.pfe.projectMonitoringBE.interfaces.IPriority;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(value = "/priority")
public class PriorityController {

	@Autowired
	private IPriority service;

	@GetMapping("/all")
	public List<Priority> getAll() {
		return service.getAllPriority();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Priority> getPriorityById(@PathVariable Integer id) {
		try {
			Priority priority = service.findPriority(id);
			return new ResponseEntity<Priority>(priority, HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<Priority>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/add")
	public void addPriority(@RequestBody Priority priority) {
		service.createOrUpdatePriority(priority);
	}

	@PutMapping("/update/{id}")
	public void updatePriority(@RequestBody Priority priority) {
		try {
			Priority searchedPriority = service.findPriority(priority.getPriorityID());
			if (searchedPriority.getPriorityID() != null) {
				service.createOrUpdatePriority(priority);
			}
		} catch (NoSuchElementException e) {

		}
	}

	@DeleteMapping("/delete/{id}")
	public void deletePriority(@PathVariable Integer id) {
		try {
			Priority searchedPriority = service.findPriority(id);
			if (searchedPriority.getPriorityID() != null) {
				service.deletePriority(searchedPriority);
			}
		} catch (NoSuchElementException e) {

		}
	}
	
}

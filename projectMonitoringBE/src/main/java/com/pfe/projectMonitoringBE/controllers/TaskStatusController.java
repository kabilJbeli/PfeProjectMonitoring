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

import com.pfe.projectMonitoringBE.entities.TaskStatus;
import com.pfe.projectMonitoringBE.services.TaskStatusService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(value = "/taskStatus")
public class TaskStatusController {

	@Autowired
	private TaskStatusService service;

	@GetMapping("/all")
	public List<TaskStatus> getAll() {
		return service.getAllTaskStatus();
	}

	@GetMapping("/{id}")
	public ResponseEntity<TaskStatus> getTaskStatusById(@PathVariable Integer id) {
		try {
			TaskStatus taskStatus = service.findTaskStatus(id);
			return new ResponseEntity<TaskStatus>(taskStatus, HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<TaskStatus>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/add")
	public void addTaskStatus(@RequestBody TaskStatus taskStatus) {
		service.createOrUpdateTaskStatus(taskStatus);
	}

	@PutMapping("/update/{id}")
	public void updateTaskStatus(@RequestBody TaskStatus taskStatus) {
		try {
			TaskStatus searchedTaskStatus = service.findTaskStatus(taskStatus.getTaskStatusID());
			if (searchedTaskStatus.getTaskStatusID() != null) {
				service.createOrUpdateTaskStatus(taskStatus);
			}
		} catch (NoSuchElementException e) {

		}
	}

	@DeleteMapping("/delete/{id}")
	public void deleteTaskStatus(@PathVariable Integer id) {
		try {
			TaskStatus taskStatus = service.findTaskStatus(id);
			if (taskStatus.getTaskStatusID() != null) {
				service.deleteTaskStatus(taskStatus);
			}
		} catch (NoSuchElementException e) {

		}
	}
}

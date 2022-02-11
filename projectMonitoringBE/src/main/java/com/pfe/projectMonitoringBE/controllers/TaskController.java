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

import com.pfe.projectMonitoringBE.entities.Task;
import com.pfe.projectMonitoringBE.services.TaskService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(value = "/task")
public class TaskController {

	@Autowired
	private TaskService service;

	@GetMapping("/all")
	public List<Task> getAll() {
		return service.getAllTask();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Task> getTaskById(@PathVariable Integer id) {
		try {
			Task task = service.findTask(id);
			return new ResponseEntity<Task>(task, HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<Task>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/add")
	public void addTask(@RequestBody Task task) {
		service.createOrUpdateTask(task);
	}

	@PutMapping("/update/{id}")
	public void updateTask(@RequestBody Task task) {
		try {
			Task searchedTask = service.findTask(task.getTaskID());
			if (searchedTask.getTaskID() != null) {
				service.createOrUpdateTask(task);
			}
		} catch (NoSuchElementException e) {

		}
	}

	@DeleteMapping("/delete/{id}")
	public void deleteTask(@PathVariable Integer id) {
		try {
			Task task = service.findTask(id);
			if (task.getTaskID() != null) {
				service.deleteTask(task);
			}
		} catch (NoSuchElementException e) {

		}
	}
}
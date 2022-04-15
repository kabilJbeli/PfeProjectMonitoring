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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pfe.projectMonitoringBE.entities.TaskDuration;
import com.pfe.projectMonitoringBE.interfaces.ITaskDuration;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(value = "/taskDuration")
public class TaskDurationController {

	@Autowired
	private ITaskDuration service;

	@GetMapping("/all")
	public List<TaskDuration> getAll() {
		return service.getAllTaskDuration();
	}

	@GetMapping("/findTaskDurationByTasks")
	public List<TaskDuration> findTaskDurationByTasks(@RequestParam Integer id) {
		return service.findTaskDurationByTasks(id);
	}	

	@GetMapping("/{id}")
	public ResponseEntity<TaskDuration> getTaskById(@PathVariable Integer id) {
		try {
			TaskDuration taskDuration = service.findTaskDuration(id);
			return new ResponseEntity<TaskDuration>(taskDuration, HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<TaskDuration>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/add")
	public void addTask(@RequestBody TaskDuration taskDuration) {
		service.createOrUpdateTaskDuration(taskDuration);
	}

	@PutMapping("/update")
	public void updateTask(@RequestBody TaskDuration taskDuration) {
		try {
			service.createOrUpdateTaskDuration(taskDuration);

		} catch (NoSuchElementException e) {

		}
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteTask(@PathVariable Integer id) {
		try {
			TaskDuration taskDuration = service.findTaskDuration(id);
			if (taskDuration.getDurationId() == null) {
				service.deleteTaskDuration(taskDuration);
			}
		} catch (NoSuchElementException e) {

		}
	}	
	
}

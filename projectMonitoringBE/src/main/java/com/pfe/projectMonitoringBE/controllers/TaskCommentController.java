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
import com.pfe.projectMonitoringBE.entities.TaskComment;
import com.pfe.projectMonitoringBE.interfaces.ITaskComment;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(value = "/taskComment")
public class TaskCommentController {

	@Autowired
	private ITaskComment service;

	@GetMapping("/all")
	public List<TaskComment> getAll() {
		return service.getAllTaskComments();
	}

	@PostMapping("/getCommentByTasks")
	public List<TaskComment> getCommentByTasks(@RequestBody Task task) {
		return service.getCommentByTaskComment(task);
	}

	@GetMapping("/{id}")
	public ResponseEntity<TaskComment> getTaskById(@PathVariable Integer id) {
		try {
			TaskComment task = service.findTaskComment(id);
			return new ResponseEntity<TaskComment>(task, HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<TaskComment>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/add")
	public void addTask(@RequestBody TaskComment task) {
		service.createOrUpdateTaskComment(task);
	}

	@PutMapping("/update")
	public void updateTask(@RequestBody TaskComment task) {
		try {
			service.createOrUpdateTaskComment(task);

		} catch (NoSuchElementException e) {

		}
	}

	@DeleteMapping("/delete/{id}")
	public void deleteTask(@PathVariable Integer id) {
		try {
			TaskComment task = service.findTaskComment(id);
			if (task.getCommentID() != null) {
				service.deleteTaskComment(task);
			}
		} catch (NoSuchElementException e) {

		}
	}
}

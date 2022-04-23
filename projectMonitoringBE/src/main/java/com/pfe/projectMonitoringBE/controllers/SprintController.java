package com.pfe.projectMonitoringBE.controllers;

import java.time.Period;
import java.util.ArrayList;
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

import com.pfe.projectMonitoringBE.Enums.ProjectStatus;
import com.pfe.projectMonitoringBE.Enums.TaskStatus;
import com.pfe.projectMonitoringBE.entities.Sprint;
import com.pfe.projectMonitoringBE.entities.Task;
import com.pfe.projectMonitoringBE.interfaces.ISprint;
import com.pfe.projectMonitoringBE.interfaces.ITask;
import com.pfe.projectMonitoringBE.models.ProjectStats;
import com.pfe.projectMonitoringBE.models.SprintModel;
import com.pfe.projectMonitoringBE.models.SprintStats;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(value = "/sprint")
public class SprintController {

	@Autowired
	private ISprint service;

	@Autowired
	private ITask serviceTask;

	@GetMapping("/getSprintByStatus")
	public SprintModel getSprintByStatus(@RequestParam String email) {
		return service.getSprintByStatus(email);
	}

	@GetMapping("/getClientSprintByStatus")
	public SprintModel getClientSprintByStatus(@RequestParam String email) {
		return service.getClientSprintByStatus(email);
	}

	@GetMapping("/getEmployeeSprintByStatus")
	public SprintModel getEmployeeSprintByStatus(@RequestParam String email) {
		return service.getEmployeeSprintByStatus(email);
	}

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

		Period period = Period.between(sprint.getSprintStartDate().toLocalDate(),
				sprint.getSprintEndDate().toLocalDate());

		sprint.setPeriod(period.getDays());

		service.createOrUpdateSprint(sprint);

		sprint.getTask().forEach(task -> {
			task.setSprint(sprint);
			serviceTask.createOrUpdateTask(task);
		});

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

	@GetMapping("/getTasksBySprintId")
	public List<Task> getTasksBySprintId(@RequestParam Integer sprintID) {
		return service.getTasksBySprintId(sprintID);
	}

	@GetMapping("/getCurrentSprintStats")
	public List<SprintStats> getCurrentSprintStats(@RequestParam Integer sprintID) {
		List<Task> tasks = service.getTasksBySprintId(sprintID);
		List<SprintStats> sprintStats = new ArrayList<SprintStats>();

		sprintStats.add(service.calculation(serviceTask.findByTaskStatus(TaskStatus.ToDo, sprintID), TaskStatus.ToDo));

		sprintStats.add(service.calculation(serviceTask.findByTaskStatus(TaskStatus.Done, sprintID), TaskStatus.Done));

		sprintStats.add(service.calculation(serviceTask.findByTaskStatus(TaskStatus.InProgress, sprintID),
				TaskStatus.InProgress));

		sprintStats.add(service.calculation(serviceTask.findByTaskStatus(TaskStatus.ReadyForRelease, sprintID),
				TaskStatus.ReadyForRelease));

		sprintStats.add(
				service.calculation(serviceTask.findByTaskStatus(TaskStatus.Released, sprintID), TaskStatus.Released));

		sprintStats.add(
				service.calculation(serviceTask.findByTaskStatus(TaskStatus.Testing, sprintID), TaskStatus.Testing));

		sprintStats.add(service.calculation(serviceTask.findByTaskStatus(TaskStatus.Validating, sprintID),
				TaskStatus.Validating));

		return sprintStats;

	}

	@GetMapping("/getCurrentSprintByProject")
	public List<Sprint> getProjectCurrentSprint(@RequestParam Integer projectID) {
		return service.getProjectCurrentSprint(projectID);
	}
	
	@GetMapping("/getProjectCurrentSprintByEndAndStartDates")
	public ResponseEntity<Sprint> getProjectCurrentSprintByEndAndStartDates(@RequestParam Integer projectID) {
		
		try {
			Sprint sprint = service.getProjectCurrentSprintByEndAndStartDates(projectID);
			return new ResponseEntity<Sprint>(sprint, HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<Sprint>(HttpStatus.NOT_FOUND);
		}
		
	}

}

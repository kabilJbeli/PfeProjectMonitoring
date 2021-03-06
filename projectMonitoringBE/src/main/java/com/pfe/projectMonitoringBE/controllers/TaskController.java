package com.pfe.projectMonitoringBE.controllers;

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

import com.pfe.projectMonitoringBE.Enums.Roles;
import com.pfe.projectMonitoringBE.Enums.TaskStatus;
import com.pfe.projectMonitoringBE.entities.Sprint;
import com.pfe.projectMonitoringBE.entities.Task;
import com.pfe.projectMonitoringBE.interfaces.IEmail;
import com.pfe.projectMonitoringBE.interfaces.ITask;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(value = "/task")
public class TaskController {

	@Autowired
	private ITask service;

	@Autowired
	private IEmail emailService;

	@GetMapping("/all")
	public List<Task> getAll() {
		return service.getAllTask();
	}

	@GetMapping("/getTotalNumberOfTasks")
	public Integer getTotalNumberOfTasks(@RequestParam Roles role, @RequestParam String email) {
		List<Task> taskList = new ArrayList<Task>();

		switch (role) {

		case ADMINISTRATOR: {
			taskList = service.getAllTask();
			break;
		}
		case CLIENT: {
			taskList = service.getClientTask(email);
			break;
		}
		case EMPLOYEE: {
			taskList = service.getTaskByMember(email);
			break;
		}

		case MANAGER: {
			taskList = service.getTaskByReporter(email);
			break;
		}
		default: {
			break;
		}

		}

		return taskList.size();
	}

	@GetMapping("/getClientTotalNumberOfTasks")
	public Integer getClientTotalNumberOfTasks(@RequestParam String email) {
		return service.getClientTask(email).size();
	}

	@GetMapping("/getEmployeeTotalNumberOfTasks")
	public Integer getEmployeeTotalNumberOfTasks(@RequestParam String email) {
		return service.getTaskByMember(email).size();
	}

	@GetMapping("/getManagerTotalNumberOfTasks")
	public Integer getManagerTotalNumberOfTasks(@RequestParam String email) {
		return service.getTaskByReporter(email).size();
	}

	@GetMapping("/getTaskByReporter")
	public List<Task> getTaskByReporter(@RequestParam String email) {
		return service.getTaskByReporter(email);
	}

	@GetMapping("/getTaskByMember")
	public List<Task> getTaskByMember(@RequestParam String email) {
		return service.getTaskByMember(email);
	}

	@GetMapping("/getTaskCreatedByClient")
	public List<Task> getTaskCreatedByClient(@RequestParam String email) {
		return service.getTaskCreatedByClient(email);
	}

	@GetMapping("/getClientTask")
	public List<Task> getClientTask(@RequestParam String email) {
		return service.getClientTask(email);
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
	
	
	@GetMapping("/getAttachedSprint/{id}")
	public ResponseEntity<Sprint> getAttachedSprint(@PathVariable Integer id) {
		try {
			Task task = service.findTask(id);
			if(task.getSprint() != null) {
				return new ResponseEntity<Sprint>(task.getSprint(), HttpStatus.OK);

			}else {
				return new ResponseEntity<Sprint>(HttpStatus.NOT_FOUND);
			}
		} catch (NoSuchElementException e) {
			return new ResponseEntity<Sprint>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/add")
	public Task addTask(@RequestBody Task task) {
		Task createdTask = service.createOrUpdateTask(task);
		if (task.getIsCreatedByClient()) {
			emailService.sendSimpleMessage(task.getProject().getProjectManager().getEmail(), "Client Task",
					task.getProject().getProjectTitle()
							+ " Client has created a new task that requires your validation, Task Summary: "
							+ task.getTaskTitle());
		} else {
			if (task.getAssignee() != null && task.getAssignee().getName() != null) {
				emailService.sendSimpleMessage(task.getAssignee().getEmail(), "New Task",
						"You have been assigned  a new task for the " + task.getProject().getProjectTitle()
								+ " project, Task Summary: " + task.getTaskTitle());
			}
		}
		return createdTask;
	}

	@PutMapping("/update")
	public void updateTask(@RequestBody Task task) {
		try {
			service.createOrUpdateTask(task);
			if (task.getAssignee() != null && task.getAssignee().getName() != null) {
				emailService.sendSimpleMessage(task.getAssignee().getEmail(), "New Task",
						"You have been assigned  a new task for the " + task.getProject().getProjectTitle()
								+ " project, Task Summary: " + task.getTaskTitle());
			}

		} catch (NoSuchElementException e) {

		}
	}

	@PutMapping("/changeTaskStatus")
	public ResponseEntity<Task> updateTask(@RequestParam Integer id, @RequestParam TaskStatus status) {
		try {
			Task task = service.findTask(id);
			task.setTaskStatus(status);
			service.createOrUpdateTask(task);

			if (task.getAssignee() != null && task.getAssignee().getName() != null) {
				emailService.sendSimpleMessage(task.getReporter().getEmail(), "Task Status Changed",
						task.getAssignee().getEmail() + " has changed the task '" + task.getTaskTitle()
								+ "' status to  " + task.getTaskStatus());

				emailService.sendSimpleMessage(task.getAssignee().getEmail(), "Task Status Changed",
						"You  have changed the task '" + task.getTaskTitle() + "' status to  " + task.getTaskStatus());
			}

			return new ResponseEntity<Task>(task, HttpStatus.OK);

		} catch (NoSuchElementException e) {
			return new ResponseEntity<Task>(HttpStatus.NOT_FOUND);
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

	@GetMapping("/getSpecificClientPendingTasks")
	public List<Task> getSpecificClientPendingTasks(@RequestParam String clientEmail) {
		return service.getSpecificClientPendingTasks(clientEmail);

	}

	@GetMapping("/getAllPendingTasksCreatedByClient")
	public List<Task> getAllPendingTasksCreatedByClient(@RequestParam String email) {

		return service.getAllPendingTasksCreatedByClient(email);

	}

	@GetMapping("/getriskeyTask")
	public List<Task> getriskeyTask(Roles role, String email) {

		return service.getRiskyTask(role, email);

	}

	@GetMapping("/getUnassignedSprintTasks")
	public List<Task> getUnassignedSprintTasks(@RequestParam Integer projectID) {
		return service.getUnassignedSprintTasks(projectID);
	}

	@GetMapping("/getProjectBacklog")
	public List<Task> getProjectBacklog(@RequestParam Integer projectID) {
		return service.getProjectBacklog(projectID);
	}
	
	
	

}

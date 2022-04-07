package com.pfe.projectMonitoringBE.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pfe.projectMonitoringBE.entities.Sprint;
import com.pfe.projectMonitoringBE.entities.Task;
import com.pfe.projectMonitoringBE.repositories.TaskRepository;

@Service
public class TaskService {

	@Autowired
	private TaskRepository repository;
	
	public void createOrUpdateTask(Task task) {
		repository.save(task);
	}

	public Task findTask(int idTask) {
		return repository.findById(idTask).get();
	}

	public List<Task> getAllTask() {
		return repository.findAll();
	}

	public void deleteTask(Task task) {
		repository.delete(task);
	}
	
	public List<Task> getTaskByReporter(String email) {
	return	repository.getTaskByReporter(email);
	}
	
}

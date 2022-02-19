package com.pfe.projectMonitoringBE.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pfe.projectMonitoringBE.entities.Task;
import com.pfe.projectMonitoringBE.entities.TaskStatus;
import com.pfe.projectMonitoringBE.repositories.TaskStatusRepository;

@Service
public class TaskStatusService {

	@Autowired
	private TaskStatusRepository repository;
	
	public void createOrUpdateTaskStatus(TaskStatus taskStatus) {
		repository.save(taskStatus);
	}

	public TaskStatus findTaskStatus(int idTaskStatus) {
		return repository.findById(idTaskStatus).get();
	}

	public List<TaskStatus> getAllTaskStatus() {
		return repository.findAll();
	}

	public void deleteTaskStatus(TaskStatus taskStatus) {
		repository.delete(taskStatus);
	}
}

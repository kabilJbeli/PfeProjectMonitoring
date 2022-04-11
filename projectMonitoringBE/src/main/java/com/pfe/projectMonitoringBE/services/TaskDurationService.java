package com.pfe.projectMonitoringBE.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pfe.projectMonitoringBE.entities.Task;
import com.pfe.projectMonitoringBE.entities.TaskDuration;
import com.pfe.projectMonitoringBE.repositories.TaskDurationRepository;

@Service
public class TaskDurationService {
	@Autowired
	private TaskDurationRepository repository;
	
	public void createOrUpdateTaskDuration(TaskDuration taskDuration) {
		repository.save(taskDuration);
	}

	public TaskDuration findTaskDuration(int idTask) {
		return repository.findById(idTask).get();
	}

	public List<TaskDuration> getAllTaskDuration() {
		return repository.findAll();
	}

	public void deleteTaskDuration(TaskDuration task) {
		repository.delete(task);
	}
	
	public List<TaskDuration> findTaskDurationByTasks(Integer id) {
		return repository.findTaskDurationByTasks(id);
	}
	
}

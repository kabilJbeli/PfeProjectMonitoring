package com.pfe.projectMonitoringBE.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pfe.projectMonitoringBE.entities.Task;
import com.pfe.projectMonitoringBE.entities.TaskDuration;
import com.pfe.projectMonitoringBE.interfaces.ITaskDuration;
import com.pfe.projectMonitoringBE.repositories.TaskDurationRepository;

@Service
public class TaskDurationService implements ITaskDuration {
	@Autowired
	private TaskDurationRepository repository;

	@Override
	public void createOrUpdateTaskDuration(TaskDuration taskDuration) {
		repository.save(taskDuration);
	}

	@Override
	public TaskDuration findTaskDuration(int idTask) {
		return repository.findById(idTask).get();
	}

	@Override
	public List<TaskDuration> getAllTaskDuration() {
		return repository.findAll();
	}

	@Override
	public void deleteTaskDuration(TaskDuration task) {
		repository.delete(task);
	}

	@Override
	public List<TaskDuration> findTaskDurationByTasks(Integer id) {
		return repository.findTaskDurationByTasks(id);
	}

}

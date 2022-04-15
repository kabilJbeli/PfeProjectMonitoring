package com.pfe.projectMonitoringBE.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pfe.projectMonitoringBE.entities.Member;
import com.pfe.projectMonitoringBE.entities.Sprint;
import com.pfe.projectMonitoringBE.entities.Task;
import com.pfe.projectMonitoringBE.interfaces.ITask;
import com.pfe.projectMonitoringBE.repositories.TaskRepository;

@Service
public class TaskService implements ITask {

	@Autowired
	private TaskRepository repository;

	@Override
	public void createOrUpdateTask(Task task) {
		repository.save(task);
	}

	@Override
	public Task findTask(int idTask) {
		return repository.findById(idTask).get();
	}

	@Override
	public List<Task> getAllTask() {
		return repository.findAll();
	}

	@Override
	public void deleteTask(Task task) {
		repository.delete(task);
	}

	@Override
	public List<Task> getTaskByReporter(String email) {
		return repository.getTaskByReporter(email);
	}

	@Override
	public List<Task> getTaskByMember(String email) {
		return repository.getTaskByMember(email);
	}

	@Override
	public List<Task> getTaskCreatedByClient(String email) {
		// TODO Auto-generated method stub
		return repository.getTaskCreatedByClient(email);
	}

	@Override
	public List<Task> getClientTask(String email) {
		// TODO Auto-generated method stub
		return repository.getClientTask(email);
	}

}

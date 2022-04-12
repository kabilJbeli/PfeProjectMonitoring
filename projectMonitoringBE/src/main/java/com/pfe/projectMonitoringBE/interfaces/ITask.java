package com.pfe.projectMonitoringBE.interfaces;

import java.util.List;

import com.pfe.projectMonitoringBE.entities.Task;

public interface ITask {
	public void createOrUpdateTask(Task task);
	public Task findTask(int idTask);
	public List<Task> getAllTask();
	public void deleteTask(Task task);	
	public List<Task> getTaskByReporter(String email);
	public List<Task> getTaskByMember(String email);
}

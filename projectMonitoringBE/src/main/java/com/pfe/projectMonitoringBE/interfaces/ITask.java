package com.pfe.projectMonitoringBE.interfaces;

import java.util.List;

import com.pfe.projectMonitoringBE.Enums.TaskStatus;
import com.pfe.projectMonitoringBE.entities.Task;

public interface ITask {
	public void createOrUpdateTask(Task task);

	public Task findTask(int idTask);

	public List<Task> getAllTask();

	public void deleteTask(Task task);

	public List<Task> getTaskByReporter(String email);

	public List<Task> getTaskByMember(String email);

	public List<Task> getTaskCreatedByClient(String email);

	public List<Task> getClientTask(String email);

	public List<Task> getAllPendingTasksCreatedByClient(String email);

	public List<Task> getSpecificClientPendingTasks(String clientEmail);

	public List<Task> getRiskyTask();

	public List<Task> getUnassignedSprintTasks(Integer projectID);
	
	
	
	public List<Task> findByTaskStatus(TaskStatus taskStatus,Integer sprintID);
}

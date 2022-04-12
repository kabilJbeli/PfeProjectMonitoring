package com.pfe.projectMonitoringBE.interfaces;

import java.util.List;

import com.pfe.projectMonitoringBE.entities.TaskDuration;

public interface ITaskDuration {	
	public void createOrUpdateTaskDuration(TaskDuration taskDuration);
	public TaskDuration findTaskDuration(int idTask);
	public List<TaskDuration> getAllTaskDuration();
	public void deleteTaskDuration(TaskDuration task);	
	public List<TaskDuration> findTaskDurationByTasks(Integer id);	
}

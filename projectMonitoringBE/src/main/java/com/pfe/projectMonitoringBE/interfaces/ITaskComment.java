package com.pfe.projectMonitoringBE.interfaces;

import java.util.List;

import com.pfe.projectMonitoringBE.entities.Task;
import com.pfe.projectMonitoringBE.entities.TaskComment;

public interface ITaskComment {
	public void createOrUpdateTaskComment(TaskComment taskComment);
	public TaskComment findTaskComment(int idTaskComment);
	public List<TaskComment> getAllTaskComments();	
	public List<TaskComment> getCommentByTaskComment(Task task);
	public void deleteTaskComment(TaskComment taskComment);
}

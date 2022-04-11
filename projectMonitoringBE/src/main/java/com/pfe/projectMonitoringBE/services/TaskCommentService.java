package com.pfe.projectMonitoringBE.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pfe.projectMonitoringBE.entities.Task;
import com.pfe.projectMonitoringBE.entities.TaskComment;
import com.pfe.projectMonitoringBE.repositories.TaskCommentRepository;

@Service
public class TaskCommentService {
	@Autowired
	private TaskCommentRepository repository;
	
	
	public void createOrUpdateTaskComment(TaskComment taskComment) {
		repository.save(taskComment);
	}

	public TaskComment findTaskComment(int idTaskComment) {
		return repository.findById(idTaskComment).get();
	}

	public List<TaskComment> getAllTaskComments() {
		return repository.findAll();
	}
	
	public List<TaskComment> getCommentByTaskComment(Task task) {
		return repository.getCommentByTask(task);
	}

	public void deleteTaskComment(TaskComment taskComment) {
		repository.delete(taskComment);
	}
}

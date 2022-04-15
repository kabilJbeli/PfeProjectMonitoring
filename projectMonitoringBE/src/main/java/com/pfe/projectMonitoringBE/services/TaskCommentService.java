package com.pfe.projectMonitoringBE.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pfe.projectMonitoringBE.entities.Task;
import com.pfe.projectMonitoringBE.entities.TaskComment;
import com.pfe.projectMonitoringBE.interfaces.ITaskComment;
import com.pfe.projectMonitoringBE.repositories.TaskCommentRepository;

@Service
public class TaskCommentService implements ITaskComment {
	@Autowired
	private TaskCommentRepository repository;

	@Override
	public void createOrUpdateTaskComment(TaskComment taskComment) {
		repository.save(taskComment);
	}

	@Override
	public TaskComment findTaskComment(int idTaskComment) {
		return repository.findById(idTaskComment).get();
	}

	@Override
	public List<TaskComment> getAllTaskComments() {
		return repository.findAll();
	}

	@Override
	public List<TaskComment> getCommentByTaskComment(Task task) {
		return repository.getCommentByTask(task);
	}

	@Override
	public void deleteTaskComment(TaskComment taskComment) {
		repository.delete(taskComment);
	}
}

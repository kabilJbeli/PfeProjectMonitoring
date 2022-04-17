package com.pfe.projectMonitoringBE.services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pfe.projectMonitoringBE.Enums.DurationType;
import com.pfe.projectMonitoringBE.Enums.TaskStatus;
import com.pfe.projectMonitoringBE.entities.Member;
import com.pfe.projectMonitoringBE.entities.Sprint;
import com.pfe.projectMonitoringBE.entities.Task;
import com.pfe.projectMonitoringBE.entities.TaskDuration;
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

	@Override
	public List<Task> getAllPendingTasksCreatedByClient(String email) {
		// TODO Auto-generated method stub
		return repository.getAllPendingTasksCreatedByClient(email);
	}

	@Override
	public List<Task> getSpecificClientPendingTasks(String managerEmail, String clientEmail) {
		// TODO Auto-generated method stub
		return repository.getSpecificClientPendingTasks(managerEmail, clientEmail);
	}
	
	@Override
	public List<Task> getRiskyTask() {
		List<Task> riskytasks = new ArrayList<>();
		List<Task> tasks = repository.getTaskstatus();
		for (Task task : tasks) {
			int estimation = task.getTaskEstimation();
			LocalDateTime creationdate = task.getCreationDate();
			LocalDateTime estimateddeadline = task.getCreationDate();
			estimateddeadline.plusHours(estimation);
			if (task.getTaskStatus().equals(TaskStatus.ToDo)) {
				long hours = ChronoUnit.HOURS.between(creationdate, LocalDateTime.now());
				if (hours >= (estimation * 0.8)) {
					riskytasks.add(task);
				}
			}
			Set<TaskDuration> durations = task.getTaskDuration();
			int sum = 0;
			for (TaskDuration dur : durations) {
				sum += converter(dur.getDuration(), dur.getDurationType());
			}
			if (sum >= (estimation * 0.8) || creationdate.plusHours(sum).isBefore(estimateddeadline)) {
				riskytasks.add(task);
			}
		}

		return riskytasks;
	}
	
	//week 1 day 2 hour 3 minute
	public int converter( int value, DurationType typevalue) {
		switch (typevalue) {
		case Week  : return value * 40;
		case Day: return value * 8;
		case Hour: return value;
		case Minute: return value / 60;
		}
		return 0;
	}
	

}

package com.pfe.projectMonitoringBE.services;

import java.time.LocalDateTime;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pfe.projectMonitoringBE.Enums.TaskStatus;
import com.pfe.projectMonitoringBE.entities.Project;
import com.pfe.projectMonitoringBE.entities.Report;
import com.pfe.projectMonitoringBE.entities.Sprint;
import com.pfe.projectMonitoringBE.entities.Task;
import com.pfe.projectMonitoringBE.interfaces.ISprint;
import com.pfe.projectMonitoringBE.models.ProjectStats;
import com.pfe.projectMonitoringBE.models.SprintModel;
import com.pfe.projectMonitoringBE.models.SprintStats;
import com.pfe.projectMonitoringBE.repositories.SprintRepository;

@Service
public class SprintService implements ISprint {

	@Autowired
	private SprintRepository repository;

	@Override
	public void createOrUpdateSprint(Sprint sprint) {
		repository.save(sprint);
	}
	
	@Override
	public void saveAll(List<? extends Sprint> sprint) {
		repository.saveAll(sprint);
	}

	@Override
	public Sprint findSprint(int idSprint) {
		return repository.findById(idSprint).get();
	}

	@Override
	public List<Sprint> getAllSprint() {
		return repository.findAll();
	}

	@Override
	public void deleteSprint(Sprint sprint) {
		repository.delete(sprint);
	}

	@Override
	public SprintModel getSprintByStatus(String email) {

		SprintModel transformedSprint = new SprintModel();
		LocalDateTime currentDate = LocalDateTime.now();
		List<Sprint> sprints = repository.getSprintByStatus(email);
		List<Sprint> currentSprints = new ArrayList<Sprint>();
		List<Sprint> previousSprints = new ArrayList<Sprint>();

		sprints.forEach(sprint -> {
			Period startPeriod = Period.between(sprint.getSprintStartDate().toLocalDate(), currentDate.toLocalDate());
			Period endPeriod = Period.between(sprint.getSprintEndDate().toLocalDate(), currentDate.toLocalDate());

			if (startPeriod.getDays() >= 0 && endPeriod.getDays() >= 0) {
				currentSprints.add(sprint);
			} else {
				previousSprints.add(sprint);
			}

		});
		transformedSprint.setCurrentSprints(currentSprints);
		transformedSprint.setPreviousSprints(previousSprints);
		return transformedSprint;
	}

	@Override
	public List<Task> getTasksBySprintId(Integer sprintID) {
		return repository.getTasksBySprintId(sprintID);
	}

	@Override
	public SprintStats calculation(List<Task> tasks, TaskStatus statut) {
		return new SprintStats(statut, tasks.size());
	}

	@Override
	public SprintModel getClientSprintByStatus(String email) {
		// TODO Auto-generated method stub
		SprintModel transformedSprint = new SprintModel();
		LocalDateTime currentDate = LocalDateTime.now();

		List<Sprint> sprints = repository.getClientSprintByStatus(email);
		List<Sprint> currentSprints = new ArrayList<Sprint>();
		List<Sprint> previousSprints = new ArrayList<Sprint>();

		sprints.forEach(sprint -> {
			Period startPeriod = Period.between(sprint.getSprintStartDate().toLocalDate(), currentDate.toLocalDate());
			Period endPeriod = Period.between(sprint.getSprintEndDate().toLocalDate(), currentDate.toLocalDate());

			if (startPeriod.getDays() >= 0 && endPeriod.getDays() >= 0) {
				currentSprints.add(sprint);
			} else {
				previousSprints.add(sprint);
			}

		});
		transformedSprint.setCurrentSprints(currentSprints);
		transformedSprint.setPreviousSprints(previousSprints);
		return transformedSprint;
	}

	@Override
	public SprintModel getEmployeeSprintByStatus(String email) {
		// TODO Auto-generated method stub
		SprintModel transformedSprint = new SprintModel();
		LocalDateTime currentDate = LocalDateTime.now();

		List<Sprint> sprints = repository.getEmployeeSprintByStatus(email);
		List<Sprint> currentSprints = new ArrayList<Sprint>();
		List<Sprint> previousSprints = new ArrayList<Sprint>();

		sprints.forEach(sprint -> {
			Period startPeriod = Period.between(sprint.getSprintStartDate().toLocalDate(), currentDate.toLocalDate());
			Period endPeriod = Period.between(sprint.getSprintEndDate().toLocalDate(), currentDate.toLocalDate());

			if (startPeriod.getDays() >= 0 && endPeriod.getDays() >= 0) {
				currentSprints.add(sprint);
			} else {
				previousSprints.add(sprint);
			}

		});
		transformedSprint.setCurrentSprints(currentSprints);
		transformedSprint.setPreviousSprints(previousSprints);
		return transformedSprint;
	}
}

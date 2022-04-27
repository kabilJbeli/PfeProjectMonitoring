package com.pfe.projectMonitoringBE.services;

import java.time.LocalDateTime;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pfe.projectMonitoringBE.Enums.SprintStatus;
import com.pfe.projectMonitoringBE.Enums.TaskStatus;
import com.pfe.projectMonitoringBE.entities.Sprint;
import com.pfe.projectMonitoringBE.entities.Task;
import com.pfe.projectMonitoringBE.interfaces.ISprint;
import com.pfe.projectMonitoringBE.models.ProjectSprintStats;
import com.pfe.projectMonitoringBE.models.SprintModel;
import com.pfe.projectMonitoringBE.models.SprintStats;
import com.pfe.projectMonitoringBE.repositories.SprintRepository;

@Service
public class SprintService implements ISprint {

	@Autowired
	private SprintRepository repository;
	private Sprint currentSsprint = null;

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
	public SprintModel getAllSprintByStatus() {

		SprintModel transformedSprint = new SprintModel();
		LocalDateTime currentDate = LocalDateTime.now();
		List<Sprint> sprints = repository.findAll();
		List<Sprint> currentSprints = new ArrayList<Sprint>();
		List<Sprint> previousSprints = new ArrayList<Sprint>();
		List<Sprint> plannedSprints = new ArrayList<Sprint>();

		sprints.forEach(sprint -> {
			Period startPeriod = Period.between(sprint.getSprintStartDate().toLocalDate(), currentDate.toLocalDate());
			Period endPeriod = Period.between(currentDate.toLocalDate(), sprint.getSprintEndDate().toLocalDate());

			if (startPeriod.getDays() >= 0 && endPeriod.getDays() >= 0
					&& sprint.getStatus().equals(SprintStatus.InProgress)) {
				currentSprints.add(sprint);
			} else if (startPeriod.getDays() < 0 && endPeriod.getDays() >= 0
					&& sprint.getStatus().equals(SprintStatus.Created) || startPeriod.getDays() >= 0 && endPeriod.getDays() >= 0
							&& sprint.getStatus().equals(SprintStatus.Created) ) {
				plannedSprints.add(sprint);
			} else {
				previousSprints.add(sprint);
			}

		});

		transformedSprint.setCurrentSprints(currentSprints);
		transformedSprint.setPreviousSprints(previousSprints);
		transformedSprint.setPlannedSprints(plannedSprints);

		return transformedSprint;
	}

	@Override
	public SprintModel getSprintByStatus(String email) {

		SprintModel transformedSprint = new SprintModel();
		LocalDateTime currentDate = LocalDateTime.now();
		List<Sprint> sprints = repository.getSprintByStatus(email);
		List<Sprint> currentSprints = new ArrayList<Sprint>();
		List<Sprint> previousSprints = new ArrayList<Sprint>();
		List<Sprint> plannedSprints = new ArrayList<Sprint>();

		sprints.forEach(sprint -> {
			Period startPeriod = Period.between(sprint.getSprintStartDate().toLocalDate(), currentDate.toLocalDate());
			Period endPeriod = Period.between(currentDate.toLocalDate(), sprint.getSprintEndDate().toLocalDate());

			if (startPeriod.getDays() >= 0 && endPeriod.getDays() >= 0
					&& sprint.getStatus().equals(SprintStatus.InProgress)) {
				currentSprints.add(sprint);
			} else if (startPeriod.getDays() < 0 && endPeriod.getDays() >= 0
					&& sprint.getStatus().equals(SprintStatus.Created) || startPeriod.getDays() >= 0 && endPeriod.getDays() >= 0
							&& sprint.getStatus().equals(SprintStatus.Created) ) {
				plannedSprints.add(sprint);
			} else {
				previousSprints.add(sprint);
			}

		});

		transformedSprint.setCurrentSprints(currentSprints);
		transformedSprint.setPreviousSprints(previousSprints);
		transformedSprint.setPlannedSprints(plannedSprints);

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
	public ProjectSprintStats calculationProjectSprintStats(List<Sprint> sprints, SprintStatus statut) {
		return new ProjectSprintStats(statut, sprints.size());
	}

	
	@Override
	public SprintModel getClientSprintByStatus(String email) {
		// TODO Auto-generated method stub
		SprintModel transformedSprint = new SprintModel();
		LocalDateTime currentDate = LocalDateTime.now();

		List<Sprint> sprints = repository.getClientSprintByStatus(email);
		List<Sprint> currentSprints = new ArrayList<Sprint>();
		List<Sprint> previousSprints = new ArrayList<Sprint>();
		List<Sprint> plannedSprints = new ArrayList<Sprint>();

		sprints.forEach(sprint -> {
			Period startPeriod = Period.between(sprint.getSprintStartDate().toLocalDate(), currentDate.toLocalDate());
			Period endPeriod = Period.between(currentDate.toLocalDate(), sprint.getSprintEndDate().toLocalDate());

			if (startPeriod.getDays() >= 0 && endPeriod.getDays() >= 0
					&& sprint.getStatus().equals(SprintStatus.InProgress)) {
				currentSprints.add(sprint);
			} else if (startPeriod.getDays() < 0 && endPeriod.getDays() >= 0
					&& sprint.getStatus().equals(SprintStatus.Created) || startPeriod.getDays() >= 0 && endPeriod.getDays() >= 0
							&& sprint.getStatus().equals(SprintStatus.Created) ) {
				plannedSprints.add(sprint);
			} else {
				previousSprints.add(sprint);
			}

		});

		transformedSprint.setCurrentSprints(currentSprints);
		transformedSprint.setPreviousSprints(previousSprints);
		transformedSprint.setPlannedSprints(plannedSprints);

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
		List<Sprint> plannedSprints = new ArrayList<Sprint>();

		sprints.forEach(sprint -> {
			Period startPeriod = Period.between(sprint.getSprintStartDate().toLocalDate(), currentDate.toLocalDate());
			Period endPeriod = Period.between(currentDate.toLocalDate(), sprint.getSprintEndDate().toLocalDate());

			if (startPeriod.getDays() >= 0 && endPeriod.getDays() >= 0
					&& sprint.getStatus().equals(SprintStatus.InProgress)) {
				currentSprints.add(sprint);
			} else if (startPeriod.getDays() < 0 && endPeriod.getDays() >= 0
					&& sprint.getStatus().equals(SprintStatus.Created)) {
				plannedSprints.add(sprint);
			} else {
				previousSprints.add(sprint);
			}

		});

		transformedSprint.setCurrentSprints(currentSprints);
		transformedSprint.setPreviousSprints(previousSprints);
		transformedSprint.setPlannedSprints(plannedSprints);
		return transformedSprint;
	}

	@Override
	public Sprint getProjectCurrentSprintByEndAndStartDates(Integer projectID) {
		List<Sprint> sprints = repository.getProjectCurrentSprint(projectID, SprintStatus.InProgress);
		LocalDateTime dateTime = LocalDateTime.now();
		this.currentSsprint = null;
		sprints.forEach(sprint -> {
			if (dateTime.isAfter(sprint.getSprintStartDate()) && dateTime.isBefore(sprint.getSprintEndDate())
					&& sprint.getStatus() == SprintStatus.InProgress) {
				this.currentSsprint = sprint;
			}
		});
		return currentSsprint;

	}

	@Override
	public List<Sprint> getProjectCurrentSprint(Integer projectID) {
		return repository.getProjectCurrentSprint(projectID, SprintStatus.InProgress);

	}

	@Override
	public List<Sprint> getProjectSprints(Integer projectID) {
		return repository.getProjectSprints(projectID, SprintStatus.Done);
	}

	@Override
	public List<Sprint> findSprintByStatus(SprintStatus status) {
		// TODO Auto-generated method stub
		return repository.findSprintByStatus(status);
	}

	@Override
	public List<Sprint> findManagerSprintByStatus(String email, SprintStatus status) {
		// TODO Auto-generated method stub
		return repository.findManagerSprintByStatus(email, status);
	}

	@Override
	public List<Sprint> findClientSprintByStatus(String email, SprintStatus status) {
		// TODO Auto-generated method stub
		return repository.findClientSprintByStatus(email, status);
	}

	@Override
	public List<Sprint> findEmployeeSprintByStatus(String email, SprintStatus status) {
		// TODO Auto-generated method stub
		return repository.findEmployeeSprintByStatus(email, status);
	}

}

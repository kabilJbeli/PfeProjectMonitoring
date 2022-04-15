package com.pfe.projectMonitoringBE.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pfe.projectMonitoringBE.entities.Report;
import com.pfe.projectMonitoringBE.entities.Sprint;
import com.pfe.projectMonitoringBE.interfaces.ISprint;
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
}

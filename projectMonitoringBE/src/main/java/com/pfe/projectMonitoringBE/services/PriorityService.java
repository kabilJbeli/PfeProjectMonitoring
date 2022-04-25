package com.pfe.projectMonitoringBE.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pfe.projectMonitoringBE.entities.Priority;
import com.pfe.projectMonitoringBE.interfaces.IPriority;
import com.pfe.projectMonitoringBE.repositories.PriorityRepository;

@Service
public class PriorityService implements IPriority {

	@Autowired
	private PriorityRepository repository;

	@Override
	public void createOrUpdatePriority(Priority priority) {
		repository.save(priority);
	}

	@Override
	public Priority findPriority(int idPriority) {
		return repository.findById(idPriority).get();
	}

	@Override
	public List<Priority> getAllPriority() {
		return repository.findAll();
	}

	@Override
	public void deletePriority(Priority priority) {
		repository.delete(priority);
	}
}

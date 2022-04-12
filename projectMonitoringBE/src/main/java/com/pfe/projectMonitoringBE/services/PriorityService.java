package com.pfe.projectMonitoringBE.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pfe.projectMonitoringBE.entities.Member;
import com.pfe.projectMonitoringBE.entities.Priority;
import com.pfe.projectMonitoringBE.interfaces.IPriority;
import com.pfe.projectMonitoringBE.repositories.PriorityRepository;

@Service
public class PriorityService implements IPriority {

	@Autowired
	private PriorityRepository repository;
	
	public void createOrUpdatePriority(Priority priority) {
		repository.save(priority);
	}

	public Priority findPriority(int idPriority) {
		return repository.findById(idPriority).get();
	}

	public List<Priority> getAllPriority() {
		return repository.findAll();
	}

	public void deletePriority(Priority priority) {
		repository.delete(priority);
	}
}

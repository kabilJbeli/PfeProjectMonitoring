package com.pfe.projectMonitoringBE.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pfe.projectMonitoringBE.entities.Project;
import com.pfe.projectMonitoringBE.entities.ProjectStatus;
import com.pfe.projectMonitoringBE.repositories.ProjectStatusRepository;

@Service
public class ProjectStatusService {

	@Autowired
	private ProjectStatusRepository repository;
	
	public void createOrUpdateProjectStatus(ProjectStatus projectStatus) {
		repository.save(projectStatus);
	}

	public ProjectStatus findProjectStatus(int idProjectStatus) {
		return repository.findById(idProjectStatus).get();
	}

	public List<ProjectStatus> getAllProjectStatus() {
		return repository.findAll();
	}

	public void deleteProjectStatus(ProjectStatus projectStatus) {
		repository.delete(projectStatus);
	}
}

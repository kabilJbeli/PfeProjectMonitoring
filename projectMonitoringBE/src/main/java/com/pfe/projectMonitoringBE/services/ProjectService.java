package com.pfe.projectMonitoringBE.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pfe.projectMonitoringBE.entities.Member;
import com.pfe.projectMonitoringBE.entities.Priority;
import com.pfe.projectMonitoringBE.entities.Project;
import com.pfe.projectMonitoringBE.repositories.ProjectRepository;

@Service
public class ProjectService {

	@Autowired
	private ProjectRepository repository;
	
	
	public void createOrUpdateProject(Project project) {
		repository.save(project);
	}

	public Project findProject(int idProject) {
		return repository.findById(idProject).get();
	}

	public List<Project> getAllProject() {
		return repository.findAll();
	}

	public void deleteProject(Project project) {
		repository.delete(project);
	}
	
	public  List<Project> getManagerProjects(Member member) {
		return repository.findByProjectmanager(member);
	}
	public  List<Project> findByMember(String email) {
		return repository.findByMember(email);
	}
	
	public List<Member> findProjectMembers(Integer id){
		return repository.findProjectMembers(id);
	}
	
}

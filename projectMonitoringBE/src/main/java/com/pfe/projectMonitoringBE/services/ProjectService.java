package com.pfe.projectMonitoringBE.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pfe.projectMonitoringBE.Enums.ProjectStatus;
import com.pfe.projectMonitoringBE.entities.Member;
import com.pfe.projectMonitoringBE.entities.Priority;
import com.pfe.projectMonitoringBE.entities.Project;
import com.pfe.projectMonitoringBE.interfaces.IProject;
import com.pfe.projectMonitoringBE.models.ProjectStats;
import com.pfe.projectMonitoringBE.repositories.ProjectRepository;

@Service
public class ProjectService implements IProject {

	@Autowired
	private ProjectRepository repository;

	@Override
	public void createOrUpdateProject(Project project) {
		repository.save(project);
	}

	@Override
	public Project findProject(int idProject) {
		return repository.findById(idProject).get();
	}

	@Override
	public List<Project> getAllProject() {
		return repository.findAll();
	}

	@Override
	public void deleteProject(Project project) {
		repository.delete(project);
	}

	@Override
	public List<Project> getManagerProjects(Member member) {
		return repository.findByProjectmanager(member);
	}

	@Override
	public List<Project> findByMember(String email) {
		return repository.findByMember(email);
	}

	@Override
	public List<Project> findByClient(String email) {
		return repository.findByClient(email);
	}

	@Override
	public List<Member> findProjectMembers(Integer id) {
		return repository.findProjectMembers(id);
	}

	@Override
	public List<ProjectStats> getProjectsStats() {
		List<ProjectStats> projectsta = new ArrayList<ProjectStats>();
		projectsta.add(
				calculation(repository.findByProjectStatus(ProjectStatus.Created), ProjectStatus.Created.toString()));
		projectsta.add(
				calculation(repository.findByProjectStatus(ProjectStatus.Finished), ProjectStatus.Finished.toString()));
		projectsta.add(calculation(repository.findByProjectStatus(ProjectStatus.InMaintenance),
				ProjectStatus.InMaintenance.toString()));
		projectsta.add(calculation(repository.findByProjectStatus(ProjectStatus.InProgress),
				ProjectStatus.InProgress.toString()));
		projectsta.add(
				calculation(repository.findByProjectStatus(ProjectStatus.Released), ProjectStatus.Released.toString()));
		return projectsta;
	}

	@Override
	public List<ProjectStats> getNumberClientPerProject(Member client) {
		List<ProjectStats> projectsta = new ArrayList<ProjectStats>();
		projectsta.add(calculation(repository.findProjectClientperstatut(ProjectStatus.Created, client),
				ProjectStatus.Created.toString()));
		projectsta.add(calculation(repository.findProjectClientperstatut(ProjectStatus.Finished, client),
				ProjectStatus.Finished.toString()));
		projectsta.add(calculation(repository.findProjectClientperstatut(ProjectStatus.InMaintenance, client),
				ProjectStatus.InMaintenance.toString()));
		projectsta.add(calculation(repository.findProjectClientperstatut(ProjectStatus.InProgress, client),
				ProjectStatus.InProgress.toString()));
		projectsta.add(calculation(repository.findProjectClientperstatut(ProjectStatus.Released, client),
				ProjectStatus.Released.toString()));
		return projectsta;
	}

	@Override
	public List<ProjectStats> getNumberEmployeePerProject(Member employee) {
		List<ProjectStats> projectsta = new ArrayList<ProjectStats>();
		projectsta.add(calculation(repository.findProjectEmployeeperstatut(ProjectStatus.Created, employee),
				ProjectStatus.Created.toString()));
		projectsta.add(calculation(repository.findProjectEmployeeperstatut(ProjectStatus.Finished, employee),
				ProjectStatus.Finished.toString()));
		projectsta.add(calculation(repository.findProjectEmployeeperstatut(ProjectStatus.InMaintenance, employee),
				ProjectStatus.InMaintenance.toString()));
		projectsta.add(calculation(repository.findProjectEmployeeperstatut(ProjectStatus.InProgress, employee),
				ProjectStatus.InProgress.toString()));
		projectsta.add(calculation(repository.findProjectEmployeeperstatut(ProjectStatus.Released, employee),
				ProjectStatus.Released.toString()));
		return projectsta;
	}

	@Override
	public List<ProjectStats> getNumberManagerPerProject(Member employee) {
		List<ProjectStats> projectsta = new ArrayList<ProjectStats>();
		projectsta.add(calculation(repository.findProjectManagerperstatut(ProjectStatus.Created, employee),
				ProjectStatus.Created.toString()));
		projectsta.add(calculation(repository.findProjectManagerperstatut(ProjectStatus.Finished, employee),
				ProjectStatus.Finished.toString()));
		projectsta.add(calculation(repository.findProjectManagerperstatut(ProjectStatus.InMaintenance, employee),
				ProjectStatus.InMaintenance.toString()));
		projectsta.add(calculation(repository.findProjectManagerperstatut(ProjectStatus.InProgress, employee),
				ProjectStatus.InProgress.toString()));
		projectsta.add(calculation(repository.findProjectManagerperstatut(ProjectStatus.Released, employee),
				ProjectStatus.Released.toString()));
		return projectsta;
	}

	public ProjectStats calculation(List<Project> projects, String statut) {
		return new ProjectStats(statut, projects.size());
	}



}

package com.pfe.projectMonitoringBE.controllers;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pfe.projectMonitoringBE.Enums.ProjectStatus;
import com.pfe.projectMonitoringBE.entities.Member;
import com.pfe.projectMonitoringBE.entities.Project;
import com.pfe.projectMonitoringBE.interfaces.IEmail;
import com.pfe.projectMonitoringBE.interfaces.IMember;
import com.pfe.projectMonitoringBE.interfaces.IProject;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(value = "/project")
public class ProjectController {

	@Autowired
	private IProject service;

	@Autowired
	private IMember memberService;
	

	@Autowired
	private IEmail emailService;

	@GetMapping("/all")
	public List<Project> getAll() {
		return service.getAllProject();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Project> getProjectById(@PathVariable Integer id) {
		try {
			Project project = service.findProject(id);
			return new ResponseEntity<Project>(project, HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<Project>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/getProjectsByProjectManager")
	public List<Project> getProjectByManagerEmail(@RequestParam String email) {

		Member projectManager = memberService.findByMemberByEmail(email);
		return service.getManagerProjects(projectManager);

	}
	
	
	@GetMapping("/getProjectsByClient")
	public List<Project> findByClient(@RequestParam String email) {

		return service.findByClient(email);

	}
	
	
	
	
	@GetMapping("/findByMember")
	public List<Project> getProjectByMemberEmail(@RequestParam String email) {

		return service.findByMember(email.trim());

	}

	@PostMapping("/add")
	public void addProject(@RequestBody Project project) {
		service.createOrUpdateProject(project);
		
		emailService.sendSimpleMessage(project.getProjectManager().getEmail(), "New Project", "You have been assigned as a project manager in a new project: "+project.getProjectTitle());
	
		emailService.sendSimpleMessage(project.getClient().getEmail(), "New Projectl", "You have been assigned as a client in a new project: "+project.getProjectTitle());

	}

	@PutMapping("/update/{id}")
	public void updateProject(@RequestBody Project project) {
		try {
			Project searchedProject = service.findProject(project.getProjectID());
			if (searchedProject.getProjectID() != null) {
				service.createOrUpdateProject(project);
			}
		} catch (NoSuchElementException e) {

		}
	}

	@DeleteMapping("/delete/{id}")
	public void deleteProject(@PathVariable Integer id) {
		try {
			Project searchedProject = service.findProject(id);
			if (searchedProject.getProjectID() != null) {
				service.deleteProject(searchedProject);
			}
		} catch (NoSuchElementException e) {

		}
	}
	
	
	@PostMapping("/assignMembersToProject")
	public Project assignProjectMembers(@RequestBody Set<Member> members,@RequestParam Integer projectId) {
		
		Project searchedProject = service.findProject(projectId);
		try {
			if (searchedProject.getProjectID() != null) {
				
				searchedProject.setMembers(members);
				service.createOrUpdateProject(searchedProject);
				members.forEach(member  -> {
					
					emailService.sendSimpleMessage(member.getEmail(), "New Project", "You have been assigned as an employee in a new project: "+searchedProject.getProjectTitle());
	
				});

			}
		} catch (NoSuchElementException e) {

		}
		return searchedProject;
	}
	
	@GetMapping("/changeProjectStatus")
	public Project changeProjectStatus(@RequestParam Integer projectId,@RequestParam ProjectStatus projectStatus) {
		Project searchedProject = service.findProject(projectId);
		try {
			if (searchedProject.getProjectID() != null) {
				searchedProject.setProjectStatus(projectStatus);
				service.createOrUpdateProject(searchedProject);
				emailService.sendSimpleMessage(searchedProject.getProjectManager().getEmail(), "Project Status Changed", "You have changed the "+searchedProject.getProjectTitle()+" project status to: "+projectStatus);
			}
		} catch (NoSuchElementException e) {

		}
		return searchedProject;
	}
	
	
	@GetMapping("/findProjectMembers")
	public List<Member> findProjectMembers(@RequestParam Integer projectId) {
		List<Member> members = null;
		try {
			members =service.findProjectMembers(projectId);
			
		} catch (NoSuchElementException e) {

		}
		return members;
	}	
	
}

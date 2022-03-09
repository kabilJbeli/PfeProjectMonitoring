package com.pfe.projectMonitoringBE.entities;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer" })
public class Project implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -4644212033087314948L;

	@Column(name = "PROJECTID")
	private Integer projectID;

	private Set<Sprint> sprint;

	private Set<Report> report;

	private Set<Task> tasks;

	private ProjectStatus projectStatus;

	private Set<Member> members;
	
	@Column(name = "PROJECTMANAGER")
	private Member projectManager;
	
	

	@Column(name = "PROJECTTITLE")
	private String projectTitle;
	
	@Column(name = "PROJECTDESCRIPTION")
	private String projectDescription;
	
	@Column(name = "STARTDATE")
	private LocalDateTime startDate;
	
	@Column(name = "ENDDATE")
	private LocalDateTime endDate;

	
	
	
	
	public Member getProjectManager() {
		return projectManager;
	}

	public void setProjectManager(Member projectManager) {
		this.projectManager = projectManager;
	}

	public String getProjectTitle() {
		return projectTitle;
	}

	public void setProjectTitle(String projectTitle) {
		this.projectTitle = projectTitle;
	}

	public String getProjectDescription() {
		return projectDescription;
	}

	public void setProjectDescription(String projectDescription) {
		this.projectDescription = projectDescription;
	}

	public LocalDateTime getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDateTime startDate) {
		this.startDate = startDate;
	}

	public LocalDateTime getEndDate() {
		return endDate;
	}

	public void setEndDate(LocalDateTime endDate) {
		this.endDate = endDate;
	}

	@OneToMany
	public Set<Member> getMembers() {
		return members;
	}

	public void setMembers(Set<Member> members) {
		this.members = members;
	}

	@OneToOne
	public ProjectStatus getProjectStatus() {
		return projectStatus;
	}

	public void setProjectStatus(ProjectStatus projectStatus) {
		this.projectStatus = projectStatus;
	}

	@OneToMany(mappedBy="project")
	public Set<Task> getTasks() {
		return tasks;
	}
	
	public void setTasks(Set<Task> tasks) {
		this.tasks = tasks;
	}

	@OneToMany(mappedBy="project")
	public Set<Report> getReport() {
		return report;
	}

	public void setReport(Set<Report> report) {
		this.report = report;
	}

	@OneToMany(mappedBy="project")
	public Set<Sprint> getSprint() {
		return sprint;
	}

	public void setSprint(Set<Sprint> sprint) {
		this.sprint = sprint;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public Integer getProjectID() {
		return projectID;
	}

	public void setProjectID(Integer projectID) {
		this.projectID = projectID;
	}

}

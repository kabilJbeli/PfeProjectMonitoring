package com.pfe.projectMonitoringBE.entities;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.pfe.projectMonitoringBE.Enums.ProjectStatus;

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

	private Member projectManager;

	private Member client;

	private LocalDateTime creationDate=  LocalDateTime.now();
	
	
	
	public LocalDateTime getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(LocalDateTime creationDate) {
		this.creationDate = creationDate;
	}

	@Column(name = "PROJECTTITLE")
	private String projectTitle;

	@Column(name = "PROJECTDESCRIPTION")
	private String projectDescription;

	@Column(name = "STARTDATE")
	private LocalDate startDate;

	@Column(name = "ENDDATE")
	private LocalDate endDate;

	@OneToOne
	@JoinColumn(name = "client")
	public Member getClient() {
		return client;
	}

	public void setClient(Member client) {
		this.client = client;
	}

	@OneToOne
	@JoinColumn(name = "manager")
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

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	public LocalDate getEndDate() {
		return endDate;
	}

	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}

	@ManyToMany
	public Set<Member> getMembers() {
		return members;
	}

	public void setMembers(Set<Member> members) {
		this.members = members;
	}

	public ProjectStatus getProjectStatus() {
		return projectStatus;
	}

	public void setProjectStatus(ProjectStatus projectStatus) {
		this.projectStatus = projectStatus;
	}

	@JsonBackReference
	@OneToMany(mappedBy = "project")
	public Set<Task> getTasks() {
		return tasks;
	}

	public void setTasks(Set<Task> tasks) {
		this.tasks = tasks;
	}

	@OneToMany(mappedBy = "project")
	public Set<Report> getReport() {
		return report;
	}

	public void setReport(Set<Report> report) {
		this.report = report;
	}

	@OneToMany(mappedBy = "project")
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

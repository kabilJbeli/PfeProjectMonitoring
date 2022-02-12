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
import com.pfe.projectMonitoringBE.Enums.SprintTypes;

@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer" })
public class Sprint implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -5183898186955077476L;

	@Column(name = "SPRINTID")
	private Integer sprintID;

	private Project project;

	private Set<Task> task;

	private SprintTypes sprintTypes;
	
	@Column(name = "SPRINTTITLE")
	private String sprintTitle;
	
	@Column(name = "SPRINTPERIOD")
	private String sprintPeriod;
	
	@Column(name = "SPRINTSTARTDATE")
	private LocalDateTime sprintStartDate;
	
	
	@Column(name = "SPRINTENDDATE")
	private LocalDateTime sprintEndDate;
	
	
	private SprintStatus status;
	
	

	public String getSprintTitle() {
		return sprintTitle;
	}

	public void setSprintTitle(String sprintTitle) {
		this.sprintTitle = sprintTitle;
	}

	public String getSprintPeriod() {
		return sprintPeriod;
	}

	public void setSprintPeriod(String sprintPeriod) {
		this.sprintPeriod = sprintPeriod;
	}

	public LocalDateTime getSprintStartDate() {
		return sprintStartDate;
	}

	public void setSprintStartDate(LocalDateTime sprintStartDate) {
		this.sprintStartDate = sprintStartDate;
	}

	public LocalDateTime getSprintEndDate() {
		return sprintEndDate;
	}

	public void setSprintEndDate(LocalDateTime sprintEndDate) {
		this.sprintEndDate = sprintEndDate;
	}

	@OneToOne
	public SprintStatus getStatus() {
		return status;
	}

	public void setStatus(SprintStatus status) {
		this.status = status;
	}

	public SprintTypes getSprintTypes() {
		return sprintTypes;
	}

	public void setSprintTypes(SprintTypes sprintTypes) {
		this.sprintTypes = sprintTypes;
	}

	@OneToMany
	public Set<Task> getTask() {
		return task;
	}

	public void setTask(Set<Task> task) {
		this.task = task;
	}

	@OneToOne
	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public Integer getSprintID() {
		return sprintID;
	}

	public void setSprintID(Integer sprintID) {
		this.sprintID = sprintID;
	}

}

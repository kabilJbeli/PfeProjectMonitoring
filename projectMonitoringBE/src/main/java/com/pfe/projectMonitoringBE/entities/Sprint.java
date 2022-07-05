package com.pfe.projectMonitoringBE.entities;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.pfe.projectMonitoringBE.Enums.SprintStatus;
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
	
	private Integer period;
	
	
	
	public Integer getPeriod() {
		return period;
	}

	public void setPeriod(Integer period) {
		this.period = period;
	}

	@Column(name = "SPRINTTITLE")
	private String sprintTitle;
	
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

	@OneToMany(mappedBy = "sprint",fetch = FetchType.EAGER)
	@JsonManagedReference
	public Set<Task> getTask() {
		return task;
	}

	public void setTask(Set<Task> task) {
		this.task = task;
	}

	@ManyToOne	
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

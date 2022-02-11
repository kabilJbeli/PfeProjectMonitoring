package com.pfe.projectMonitoringBE.entities;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer" })
public class ProjectStatus implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3835307248599747772L;

	@Column(name = "PROJECTSTATUSID")
	private Integer projectStatusID;

	private Set<Project> projects;

	@OneToMany
	public Set<Project> getProjects() {
		return projects;
	}

	public void setProjects(Set<Project> projects) {
		this.projects = projects;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public Integer getProjectStatusID() {
		return projectStatusID;
	}

	public void setProjectStatusID(Integer projectStatusID) {
		this.projectStatusID = projectStatusID;
	}

}

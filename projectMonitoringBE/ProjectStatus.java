package com.pfe.projectMonitoringBE.entities;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

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
	
	@Column(name = "PROJECTSTATUSTITLE")
	private String projectStatusTitle;
	
	public String getProjectStatusTitle() {
		return projectStatusTitle;
	}

	public void setProjectStatusTitle(String projectStatusTitle) {
		this.projectStatusTitle = projectStatusTitle;
	}
	
	@JsonBackReference
	@OneToMany(mappedBy="projectStatus")
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

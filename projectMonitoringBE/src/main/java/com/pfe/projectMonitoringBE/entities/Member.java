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
import com.pfe.projectMonitoringBE.Enums.Roles;

@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer" })
public class Member implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -7781235773520852122L;

	@Column(name = "MEMBERID")
	private Integer memberID;

	private Set<Task> tasks;

	private Set<Project> Projects;

	private Roles role;

	public Roles getRole() {
		return role;
	}

	public void setRole(Roles role) {
		this.role = role;
	}

	@OneToMany(mappedBy = "members")
	public Set<Project> getProjects() {
		return Projects;
	}

	public void setProjects(Set<Project> projects) {
		Projects = projects;
	}

	@OneToMany
	public Set<Task> getTasks() {
		return tasks;
	}

	public void setTasks(Set<Task> tasks) {
		this.tasks = tasks;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public Integer getMemberID() {
		return memberID;
	}

	public void setMemberID(Integer memberID) {
		this.memberID = memberID;
	}

}

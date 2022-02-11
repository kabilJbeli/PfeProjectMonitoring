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
public class TaskStatus implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -9066627781861407980L;

	@Column(name = "TASKSTATUSID")
	private Integer taskStatusID;

	private Set<Task> tasks;

	@OneToMany
	public Set<Task> getTasks() {
		return tasks;
	}

	public void setTasks(Set<Task> tasks) {
		this.tasks = tasks;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public Integer getTaskStatusID() {
		return taskStatusID;
	}

	public void setTaskStatusID(Integer taskStatusID) {
		this.taskStatusID = taskStatusID;
	}

}

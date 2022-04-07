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
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer" })
public class Priority implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 2386891288759826017L;

	@Column(name = "PRIORITYID")
	private Integer priorityID;

	private Set<Task> tasks;

	@Column(name = "PRIORITYTITLE")
	private String priorityTitle;
	
	
	public String getPriorityTitle() {
		return priorityTitle;
	}

	public void setPriorityTitle(String priorityTitle) {
		this.priorityTitle = priorityTitle;
	}
	
	@JsonBackReference
	@OneToMany(mappedBy="priority")
	public Set<Task> getTasks() {
		return tasks;
	}

	public void setTasks(Set<Task> tasks) {
		this.tasks = tasks;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public Integer getPriorityID() {
		return priorityID;
	}

	public void setPriorityID(Integer priorityID) {
		this.priorityID = priorityID;
	}

}

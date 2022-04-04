package com.pfe.projectMonitoringBE.entities;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer" })
public class Task implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7969176364411651679L;

	@Column(name = "TASKID")
	private Integer taskID;

	private Sprint sprint;

	private Project project;

	private Category category;

	private Priority priority;

	private TaskStatus taskStatus;

	private Member assignee;
	
	private Member reporter;
	
	
	@OneToOne
	public Member getReporter() {
		return reporter;
	}

	public void setReporter(Member reporter) {
		this.reporter = reporter;
	}

	@Column(name = "TASKTITLE")
	private String taskTitle;
	
	
	@Column(name = "TASKDESCRIPTION")
	private String taskDescription;
	
	@Column(name = "CREATIONDATE")
	private LocalDateTime CreationDate;
	
	@Column(name = "TASKDURATION")
	private Integer taskDuration;
	
	@Column(name = "TASKESTIMATION")
	private Integer taskEstimation;
	
	

	public String getTaskTitle() {
		return taskTitle;
	}

	public void setTaskTitle(String taskTitle) {
		this.taskTitle = taskTitle;
	}

	public String getTaskDescription() {
		return taskDescription;
	}

	public void setTaskDescription(String taskDescription) {
		this.taskDescription = taskDescription;
	}

	public LocalDateTime getCreationDate() {
		return CreationDate;
	}

	public void setCreationDate(LocalDateTime creationDate) {
		CreationDate = creationDate;
	}

	public Integer getTaskDuration() {
		return taskDuration;
	}

	public void setTaskDuration(Integer taskDuration) {
		this.taskDuration = taskDuration;
	}

	public Integer getTaskEstimation() {
		return taskEstimation;
	}

	public void setTaskEstimation(Integer taskEstimation) {
		this.taskEstimation = taskEstimation;
	}

	@OneToOne
	public Member getAssignee() {
		return assignee;
	}

	public void setAssignee(Member member) {
		this.assignee = member;
	}

	@ManyToOne
	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}

	@OneToOne
	public TaskStatus getTaskStatus() {
		return taskStatus;
	}

	public void setTaskStatus(TaskStatus taskStatus) {
		this.taskStatus = taskStatus;
	}

	@OneToOne
	public Priority getPriority() {
		return priority;
	}

	public void setPriority(Priority priority) {
		this.priority = priority;
	}

	@OneToOne
	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	@ManyToOne
	public Sprint getSprint() {
		return sprint;
	}

	public void setSprint(Sprint sprint) {
		this.sprint = sprint;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public Integer getTaskID() {
		return taskID;
	}

	public void setTaskID(Integer taskID) {
		this.taskID = taskID;
	}

}

package com.pfe.projectMonitoringBE.entities;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.pfe.projectMonitoringBE.Enums.DurationType;

@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer" })
public class TaskDuration implements Serializable {
	/**
		 * 
		 */
	private static final long serialVersionUID = 1L;
	private Integer durationId;
	private Integer duration;
	private DurationType durationType;
	private LocalDateTime creationDate = LocalDateTime.now();;
	private Member loggedBy;

	
	@OneToOne
	public Member getLoggedBy() {
		return loggedBy;
	}

	public void setLoggedBy(Member loggedBy) {
		this.loggedBy = loggedBy;
	}

	public LocalDateTime getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(LocalDateTime creationDate) {
		this.creationDate = creationDate;
	}

	private Task task;

	@OneToOne
	@JsonBackReference
	public Task getTask() {
		return task;
	}

	public void setTask(Task task) {
		this.task = task;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public Integer getDurationId() {
		return durationId;
	}

	public void setDurationId(Integer durationId) {
		this.durationId = durationId;
	}

	public TaskDuration() {
		super();
		// TODO Auto-generated constructor stub
	}

	public TaskDuration(Integer duration, DurationType durationType) {
		super();
		this.duration = duration;
		this.durationType = durationType;
	}

	@Override
	public String toString() {
		return "TaskDuration [duration=" + duration + ", durationType=" + durationType + "]";
	}

	public Integer getDuration() {
		return duration;
	}

	public void setDuration(Integer duration) {
		this.duration = duration;
	}

	public DurationType getDurationType() {
		return durationType;
	}

	public void setDurationType(DurationType durationType) {
		this.durationType = durationType;
	}

}

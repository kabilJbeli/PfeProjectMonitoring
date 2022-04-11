package com.pfe.projectMonitoringBE.entities;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer" })
public class TaskComment {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private Integer commentID;
	private String comment;
	private Member commentedBy;
	private LocalDateTime creationDate = LocalDateTime.now();
	private Task task;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public Integer getCommentID() {
		return commentID;
	}

	public void setCommentID(Integer commentID) {
		this.commentID = commentID;
	}

	@Lob
	@Column(name="comment", length=512)
	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}
	
	@OneToOne	
	public Member getCommentedBy() {
		return commentedBy;
	}

	public void setCommentedBy(Member commentedBy) {
		this.commentedBy = commentedBy;
	}

	public LocalDateTime getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(LocalDateTime creationDate) {
		this.creationDate = creationDate;
	}
	
	@OneToOne
	@JsonBackReference
	public Task getTask() {
		return task;
	}

	public void setTask(Task task) {
		this.task = task;
	}

}

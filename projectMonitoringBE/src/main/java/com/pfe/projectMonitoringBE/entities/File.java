package com.pfe.projectMonitoringBE.entities;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer" })
public class File {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 2834950868118018638L;

	private Integer fileID;

	private String fileTitle;

	private LocalDateTime creationDate = LocalDateTime.now();

	private String fileType;

	private Member addedBy;

	private Task task;

	@Lob
	private byte[] fileBytes;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public Integer getFileID() {
		return fileID;
	}

	public void setFileID(Integer fileID) {
		this.fileID = fileID;
	}

	public String getFileTitle() {
		return fileTitle;
	}

	public void setFileTitle(String fileTitle) {
		this.fileTitle = fileTitle;
	}

	public byte[] getFileBytes() {
		return fileBytes;
	}

	public void setFileBytes(byte[] fileBytes) {
		this.fileBytes = fileBytes;
	}

	public LocalDateTime getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(LocalDateTime creationDate) {
		this.creationDate = creationDate;
	}

	public String getFileType() {
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}
	
	@OneToOne
	public Member getAddedBy() {
		return addedBy;
	}

	public void setAddedBy(Member addedBy) {
		this.addedBy = addedBy;
	}

	public File(Integer fileID, String fileTitle, byte[] fileBytes, LocalDateTime creationDate, String fileType,
			Member addedBy) {
		super();
		this.fileID = fileID;
		this.fileTitle = fileTitle;
		this.fileBytes = fileBytes;
		this.creationDate = creationDate;
		this.fileType = fileType;
		this.addedBy = addedBy;
	}

	public File() {
		super();
		// TODO Auto-generated constructor stub
	}

	@ManyToOne
	@JsonBackReference
	public Task getTask() {
		return task;
	}

	public void setTask(Task task) {
		this.task = task;
	}

}

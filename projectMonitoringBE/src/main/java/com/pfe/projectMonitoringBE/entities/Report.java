package com.pfe.projectMonitoringBE.entities;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;

import org.codehaus.jackson.annotate.JsonIgnore;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer" })
public class Report implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 5605652757482433831L;

	@Column(name = "REPORTID")
	private Integer reportID;

	private Project project;
	
	@Column(name = "REPORTTITLE")
	private String reportTtile;
	
	@Column(name = "CREATIONDATE")
	private LocalDateTime CreationDate= LocalDateTime.now();
	
	@Column(name = "Member")
	private Member member;
	
	@Lob
	private byte[] pdfAsBytes;
	
	@ManyToOne
	@JsonBackReference(value="member-report")
	public Member getMember() {
		return member;
	}

	public void setMember(Member member) {
		this.member = member;
	}

	public byte[] getPdfAsBytes() {
		return pdfAsBytes;
	}

	public void setPdfAsBytes(byte[] pdfAsBytes) {
		this.pdfAsBytes = pdfAsBytes;
	}

	public String getReportTtile() {
		return reportTtile;
	}

	public void setReportTtile(String reportTtile) {
		this.reportTtile = reportTtile;
	}

	public LocalDateTime getCreationDate() {
		return CreationDate;
	}

	public void setCreationDate(LocalDateTime creationDate) {
		CreationDate = creationDate;
	}

	@ManyToOne
	@JsonBackReference(value="project-report")
	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public Integer getReportID() {
		return reportID;
	}

	public void setReportID(Integer reportID) {
		this.reportID = reportID;
	}

}

package com.pfe.projectMonitoringBE.models;

import javax.persistence.Column;

import com.pfe.projectMonitoringBE.entities.Member;
import com.pfe.projectMonitoringBE.entities.Project;

public class ReportModel {
	private Project project;

	private Member member;

	private String reportTtile;
	
	private String base64StringReport;

	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}

	public Member getMember() {
		return member;
	}

	public void setMember(Member member) {
		this.member = member;
	}

	public String getReportTtile() {
		return reportTtile;
	}

	public void setReportTtile(String reportTtile) {
		this.reportTtile = reportTtile;
	}

	public String getBase64StringReport() {
		return base64StringReport;
	}

	public void setBase64StringReport(String base64StringReport) {
		this.base64StringReport = base64StringReport;
	}

	public ReportModel(Project project, Member member, String reportTtile, String base64StringReport) {
		super();
		this.project = project;
		this.member = member;
		this.reportTtile = reportTtile;
		this.base64StringReport = base64StringReport;
	}

	public ReportModel() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	

}

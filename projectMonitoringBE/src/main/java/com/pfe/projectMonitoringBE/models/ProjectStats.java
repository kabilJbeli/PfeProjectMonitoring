package com.pfe.projectMonitoringBE.models;

public class ProjectStats {

	public String description;
	public int number;

	public ProjectStats(String description, int number) {
		this.description = description;
		this.number = number;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getNumber() {
		return number;
	}

	public void setNumber(int number) {
		this.number = number;
	}

}

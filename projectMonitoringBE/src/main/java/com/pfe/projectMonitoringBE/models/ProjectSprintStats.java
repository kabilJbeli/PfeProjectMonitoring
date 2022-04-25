package com.pfe.projectMonitoringBE.models;

import com.pfe.projectMonitoringBE.Enums.SprintStatus;

public class ProjectSprintStats {
	private SprintStatus label;
	private Integer value;

	public ProjectSprintStats() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ProjectSprintStats(SprintStatus label, Integer value) {
		super();
		this.label = label;
		this.value = value;
	}

	public SprintStatus getLabel() {
		return label;
	}

	public void setLabel(SprintStatus label) {
		this.label = label;
	}

	public Integer getValue() {
		return value;
	}

	public void setValue(Integer value) {
		this.value = value;
	}

}

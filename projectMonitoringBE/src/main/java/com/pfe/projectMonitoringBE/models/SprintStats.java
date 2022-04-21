package com.pfe.projectMonitoringBE.models;

import com.pfe.projectMonitoringBE.Enums.TaskStatus;

public class SprintStats {

	private TaskStatus label;
	private Integer value;

	
	
	public SprintStats(TaskStatus label, Integer value) {
		super();
		this.label = label;
		this.value = value;
	}

	public SprintStats() {
		super();
		// TODO Auto-generated constructor stub
	}

	public TaskStatus getLabel() {
		return label;
	}

	public void setLabel(TaskStatus label) {
		this.label = label;
	}

	public Integer getValue() {
		return value;
	}

	public void setValue(Integer value) {
		this.value = value;
	}

}

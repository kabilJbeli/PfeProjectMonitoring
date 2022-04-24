package com.pfe.projectMonitoringBE.models;

import java.util.List;

import com.pfe.projectMonitoringBE.entities.Sprint;

public class SprintModel {
	private List<Sprint> currentSprints;
	private List<Sprint> previousSprints;	
	private List<Sprint> plannedSprints;
	
	

	public List<Sprint> getPlannedSprints() {
		return plannedSprints;
	}

	public void setPlannedSprints(List<Sprint> plannedSprints) {
		this.plannedSprints = plannedSprints;
	}

	public SprintModel(List<Sprint> currentSprints, List<Sprint> previousSprints,List<Sprint> plannedSprints) {
		super();
		this.plannedSprints=plannedSprints;
		this.currentSprints = currentSprints;
		this.previousSprints = previousSprints;
	}

	public SprintModel() {
		super();
		// TODO Auto-generated constructor stub
	}

	public List<Sprint> getCurrentSprints() {
		return currentSprints;
	}

	public void setCurrentSprints(List<Sprint> currentSprints) {
		this.currentSprints = currentSprints;
	}

	public List<Sprint> getPreviousSprints() {
		return previousSprints;
	}

	public void setPreviousSprints(List<Sprint> previousSprints) {
		this.previousSprints = previousSprints;
	}

}

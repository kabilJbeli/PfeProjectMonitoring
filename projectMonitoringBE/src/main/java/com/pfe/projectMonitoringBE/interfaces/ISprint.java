package com.pfe.projectMonitoringBE.interfaces;

import java.util.List;

import com.pfe.projectMonitoringBE.entities.Sprint;

public interface ISprint {
	public void createOrUpdateSprint(Sprint sprint);
	public Sprint findSprint(int idSprint);
	public List<Sprint> getAllSprint();
	public void deleteSprint(Sprint sprint);}

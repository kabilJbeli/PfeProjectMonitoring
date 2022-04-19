package com.pfe.projectMonitoringBE.interfaces;

import java.util.List;

import com.pfe.projectMonitoringBE.entities.Sprint;
import com.pfe.projectMonitoringBE.models.SprintModel;

public interface ISprint {
	public void createOrUpdateSprint(Sprint sprint);

	public Sprint findSprint(int idSprint);

	public List<Sprint> getAllSprint();

	public void deleteSprint(Sprint sprint);

	public SprintModel getSprintByStatus(String email);
}

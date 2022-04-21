package com.pfe.projectMonitoringBE.interfaces;

import java.util.List;

import com.pfe.projectMonitoringBE.Enums.TaskStatus;
import com.pfe.projectMonitoringBE.entities.Sprint;
import com.pfe.projectMonitoringBE.entities.Task;
import com.pfe.projectMonitoringBE.models.SprintModel;
import com.pfe.projectMonitoringBE.models.SprintStats;

public interface ISprint {
	public void createOrUpdateSprint(Sprint sprint);

	public Sprint findSprint(int idSprint);

	public List<Sprint> getAllSprint();

	public void deleteSprint(Sprint sprint);

	public SprintModel getSprintByStatus(String email);

	public List<Task> getTasksBySprintId(Integer sprintID);

	public SprintStats calculation(List<Task> tasks, TaskStatus statut);
	
	public SprintModel getClientSprintByStatus(String email);
	
	public SprintModel getEmployeeSprintByStatus(String email);

	public void saveAll(List<? extends Sprint> sprint);
}

package com.pfe.projectMonitoringBE.interfaces;

import java.util.List;

import com.pfe.projectMonitoringBE.entities.Priority;

public interface IPriority {
	public void createOrUpdatePriority(Priority priority);
	public Priority findPriority(int idPriority);
	public List<Priority> getAllPriority();
	public void deletePriority(Priority priority);
}

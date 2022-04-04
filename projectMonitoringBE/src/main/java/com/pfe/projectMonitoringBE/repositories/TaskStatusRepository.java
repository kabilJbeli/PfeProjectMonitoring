package com.pfe.projectMonitoringBE.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pfe.projectMonitoringBE.entities.TaskStatus;

public interface TaskStatusRepository extends JpaRepository<TaskStatus, Integer> {

	
	
}

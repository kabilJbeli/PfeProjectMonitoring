package com.pfe.projectMonitoringBE.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.pfe.projectMonitoringBE.entities.Project;
import com.pfe.projectMonitoringBE.entities.Task;
import com.pfe.projectMonitoringBE.entities.TaskDuration;

public interface TaskDurationRepository extends JpaRepository<TaskDuration, Integer> {
	@Query("SELECT  td FROM TaskDuration td INNER JOIN td.task t WHERE t.taskID=  ?1")	
    public List<TaskDuration> findTaskDurationByTasks(Integer id);
	
}

package com.pfe.projectMonitoringBE.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.pfe.projectMonitoringBE.entities.Member;
import com.pfe.projectMonitoringBE.entities.Task;

public interface TaskRepository extends JpaRepository<Task, Integer> {
	
	@Query("SELECT  t FROM Task t WHERE t.reporter.email=  ?1")	
    public List<Task> getTaskByReporter(String email);	
	
	@Query("SELECT  t FROM Task t WHERE t.assignee.email=  ?1")	
    public List<Task> getTaskByMember(String email);	
	
	@Query("SELECT  t FROM Task t WHERE t.project.client.email=  ?1")	
    public List<Task> getClientTask(String email);
	
	@Query("SELECT  t FROM Task t WHERE t.isCreatedByClient=true AND t.client.email=  ?1")	
    public List<Task> getTaskCreatedByClient(String email);
}

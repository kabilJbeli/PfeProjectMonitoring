package com.pfe.projectMonitoringBE.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.pfe.projectMonitoringBE.Enums.TaskStatus;
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

	@Query("SELECT  t FROM Task t INNER JOIN t.project p WHERE t.isCreatedByClient=true AND t.isClientTaskValidated=false AND p.projectManager.email= ?1")
	public List<Task> getAllPendingTasksCreatedByClient(String email);

	@Query("SELECT  t FROM Task t INNER JOIN t.project p WHERE t.isCreatedByClient=true AND t.isClientTaskValidated=false AND p.client.email= ?1")
	public List<Task> getSpecificClientPendingTasks(String clientEmail);

	@Query("SELECT  t FROM Task t WHERE t.taskStatus in ( 0, 1)")
	public List<Task> getTaskstatus();

	@Query("SELECT  t FROM Task t WHERE t.project.projectID = ?1 AND t.sprint IS NULL")
	public List<Task> getUnassignedSprintTasks(Integer projectID);
	
	@Query("SELECT  t FROM Task t WHERE t.project.projectID = ?1 AND t.sprint IS NULL AND t.taskStatus='ToDo'")
	public List<Task> getProjectBacklog(Integer projectID);

	@Query("SELECT  t FROM Task t WHERE t.taskStatus = ?1 AND t.sprint.sprintID = ?2")
	public List<Task> findByTaskStatus(TaskStatus taskStatus, Integer sprintID);
}

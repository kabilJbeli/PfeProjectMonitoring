package com.pfe.projectMonitoringBE.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.pfe.projectMonitoringBE.Enums.SprintStatus;
import com.pfe.projectMonitoringBE.entities.Sprint;
import com.pfe.projectMonitoringBE.entities.Task;

public interface SprintRepository extends JpaRepository<Sprint, Integer> {

	@Query("SELECT s FROM Sprint s INNER JOIN s.project p WHERE p.projectManager.email=  ?1")
	public List<Sprint> getSprintByStatus(String email);

	@Query("SELECT s FROM Sprint s INNER JOIN s.project p WHERE p.client.email=  ?1")
	public List<Sprint> getClientSprintByStatus(String email);

	@Query("SELECT s FROM Sprint s INNER JOIN s.project.members m WHERE m.email=  ?1")
	public List<Sprint> getEmployeeSprintByStatus(String email);

	@Query("SELECT s FROM Sprint s WHERE  s.project.projectID=  ?1 AND s.status=?2")
	public List<Sprint> getProjectCurrentSprint(Integer projectID, SprintStatus status);

	@Query("SELECT s FROM Sprint s WHERE  s.project.projectID=  ?1 AND s.status<>?2")
	public List<Sprint> getProjectSprints(Integer projectID, SprintStatus status);

	@Query("SELECT t FROM Sprint s INNER JOIN s.task t WHERE s.sprintID=  ?1")
	public List<Task> getTasksBySprintId(Integer sprintID);

	@Query("SELECT s FROM Sprint s WHERE s.status=?1")
	public List<Sprint> findSprintByStatus(SprintStatus status);

	@Query("SELECT s FROM Sprint s INNER JOIN s.project p WHERE p.projectManager.email=  ?1 AND  s.status=?2")
	public List<Sprint> findManagerSprintByStatus(String email, SprintStatus status);

	@Query("SELECT s FROM Sprint s INNER JOIN s.project p WHERE p.client.email=  ?1  AND  s.status=?2")
	public List<Sprint> findClientSprintByStatus(String email, SprintStatus status);

	@Query("SELECT s FROM Sprint s INNER JOIN s.project.members m WHERE m.email=  ?1  AND  s.status=?2")
	public List<Sprint> findEmployeeSprintByStatus(String email, SprintStatus status);

}

package com.pfe.projectMonitoringBE.repositories;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pfe.projectMonitoringBE.Enums.ProjectStatus;
import com.pfe.projectMonitoringBE.entities.Member;
import com.pfe.projectMonitoringBE.entities.Project;
import com.pfe.projectMonitoringBE.entities.Task;

public interface ProjectRepository extends JpaRepository<Project, Integer> {
	
	@Query("SELECT  p FROM Project p WHERE p.projectManager = ?1")	
    public List<Project> findByProjectmanager(Member projectmanager);	
		
	@Query("SELECT  p FROM Project p INNER JOIN p.members m WHERE m.email=  ?1")	
    public List<Project> findByMember(String email);
	
	@Query("SELECT  p FROM Project p INNER JOIN p.client m WHERE m.email=  ?1")	
    public List<Project> findByClient(String email);
		
	@Query("SELECT  p.tasks FROM Project p INNER JOIN p.tasks m WHERE p.projectID=  ?1")	
    public List<Task> findProjectTasks(String projectID);
	
	@Query("SELECT  p.members FROM Project p WHERE p.projectID=  ?1")	
    public List<Member> findProjectMembers(Integer id);
	
	public List<Project> findByProjectStatus(ProjectStatus projectStatus);
	
	@Query("SELECT  p FROM Project p WHERE p.projectStatus =?1 and p.client =  ?2")	
    public List<Project> findProjectClientperstatut(ProjectStatus projectStatus , Member client);
	
	@Query("SELECT  p FROM Project p INNER JOIN p.members m  WHERE  p.projectStatus =?1 and m =  ?2")	
    public List<Project> findProjectEmployeeperstatut(ProjectStatus projectStatus , Member employee);
	
	@Query("SELECT  p FROM Project p WHERE p.projectStatus =?1 and p.projectManager =  ?2")	
    public List<Project> findProjectManagerperstatut(ProjectStatus projectStatus , Member client);
}

package com.pfe.projectMonitoringBE.repositories;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pfe.projectMonitoringBE.entities.Member;
import com.pfe.projectMonitoringBE.entities.Project;

public interface ProjectRepository extends JpaRepository<Project, Integer> {
	
	@Query("SELECT  p FROM Project p WHERE p.projectManager = ?1")	
    public List<Project> findByProjectmanager(Member projectmanager);
	
		
	@Query("SELECT  p FROM Project p INNER JOIN p.members m WHERE m.email=  ?1")	
    public List<Project> findByMember(String email);
}

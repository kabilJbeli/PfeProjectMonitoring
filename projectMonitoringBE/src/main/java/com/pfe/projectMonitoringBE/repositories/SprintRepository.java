package com.pfe.projectMonitoringBE.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.pfe.projectMonitoringBE.entities.Sprint;

public interface SprintRepository extends JpaRepository<Sprint, Integer> {
	
	@Query("SELECT s FROM Sprint s INNER JOIN s.project p WHERE p.projectManager.email=  ?1")	
	public List<Sprint> getSprintByStatus(String email);
}

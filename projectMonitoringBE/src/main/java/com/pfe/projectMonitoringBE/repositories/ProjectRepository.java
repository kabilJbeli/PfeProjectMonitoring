package com.pfe.projectMonitoringBE.repositories;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pfe.projectMonitoringBE.entities.Member;
import com.pfe.projectMonitoringBE.entities.Project;

public interface ProjectRepository extends JpaRepository<Project, Integer> {

	
    @Query(value ="SELECT * FROM Project p WHERE p.project_manager=:id", nativeQuery = true)
    public List<Project> findByProjectManagerId(@Param("id") Integer id);
}

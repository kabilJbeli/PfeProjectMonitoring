package com.pfe.projectMonitoringBE.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pfe.projectMonitoringBE.entities.Project;

public interface ProjectRepository extends JpaRepository<Project, Integer> {

}

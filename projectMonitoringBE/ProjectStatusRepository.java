package com.pfe.projectMonitoringBE.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pfe.projectMonitoringBE.entities.ProjectStatus;

public interface ProjectStatusRepository extends JpaRepository<ProjectStatus, Integer> {

}

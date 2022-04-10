package com.pfe.projectMonitoringBE.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pfe.projectMonitoringBE.entities.TaskDuration;

public interface TaskDurationRepository extends JpaRepository<TaskDuration, Integer> {

}

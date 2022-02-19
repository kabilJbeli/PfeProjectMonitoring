package com.pfe.projectMonitoringBE.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pfe.projectMonitoringBE.entities.Task;

public interface TaskRepository extends JpaRepository<Task, Integer> {

}

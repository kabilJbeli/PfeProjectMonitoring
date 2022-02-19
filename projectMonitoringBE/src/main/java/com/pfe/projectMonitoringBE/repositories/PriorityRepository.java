package com.pfe.projectMonitoringBE.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pfe.projectMonitoringBE.entities.Priority;

public interface PriorityRepository  extends JpaRepository<Priority, Integer> {

}

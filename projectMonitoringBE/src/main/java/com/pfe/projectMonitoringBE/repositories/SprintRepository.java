package com.pfe.projectMonitoringBE.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pfe.projectMonitoringBE.entities.Sprint;

public interface SprintRepository extends JpaRepository<Sprint, Integer> {

}

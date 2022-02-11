package com.pfe.projectMonitoringBE.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pfe.projectMonitoringBE.entities.Report;

public interface ReportRepository extends JpaRepository<Report, Integer> {

}

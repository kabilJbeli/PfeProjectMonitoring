package com.pfe.projectMonitoringBE.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.pfe.projectMonitoringBE.entities.Member;
import com.pfe.projectMonitoringBE.entities.Report;

public interface ReportRepository extends JpaRepository<Report, Integer> {
	@Query("SELECT  r FROM Report r WHERE r.member.email =?1")	
    public List<Report> findByMember(String email);	
}

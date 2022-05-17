package com.pfe.projectMonitoringBE.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pfe.projectMonitoringBE.entities.Member;
import com.pfe.projectMonitoringBE.entities.Report;
import com.pfe.projectMonitoringBE.interfaces.IMember;
import com.pfe.projectMonitoringBE.interfaces.IReport;
import com.pfe.projectMonitoringBE.repositories.ReportRepository;

@Service
public class ReportService implements IReport {

	@Autowired
	private ReportRepository repository;


	
	@Override
	public void createOrUpdateReport(Report report) {
		repository.save(report);
	}

	@Override
	public Report findReport(int idReport) {
		return repository.findById(idReport).get();
	}

	@Override
	public List<Report> getAllReport() {
		return repository.findAll();
	}

	@Override
	public List<Report> findByMember(String email) {
		
		return repository.findByMember(email);
	}
	
	@Override
	public void deleteReport(Report report) {
		repository.delete(report);
	}
}

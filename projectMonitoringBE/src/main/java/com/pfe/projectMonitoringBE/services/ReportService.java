package com.pfe.projectMonitoringBE.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pfe.projectMonitoringBE.entities.Report;
import com.pfe.projectMonitoringBE.repositories.ReportRepository;

@Service
public class ReportService {

	@Autowired
	private ReportRepository repository;
	
	public void createOrUpdateReport(Report report) {
		repository.save(report);
	}

	public Report findReport(int idReport) {
		return repository.findById(idReport).get();
	}

	public List<Report> getAllReport() {
		return repository.findAll();
	}

	public void deleteReport(Report report) {
		repository.delete(report);
	}
}

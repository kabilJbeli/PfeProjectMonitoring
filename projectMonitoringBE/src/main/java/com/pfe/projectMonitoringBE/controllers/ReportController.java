package com.pfe.projectMonitoringBE.controllers;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pfe.projectMonitoringBE.entities.Report;
import com.pfe.projectMonitoringBE.interfaces.IReport;
import com.pfe.projectMonitoringBE.services.ReportService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(value = "/report")
public class ReportController {

	@Autowired
	private IReport service;

	@GetMapping("/all")
	public List<Report> getAll() {
		return service.getAllReport();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Report> getReportById(@PathVariable Integer id) {
		try {
			Report report = service.findReport(id);
			return new ResponseEntity<Report>(report, HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<Report>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/add")
	public void addReport(@RequestBody Report report) {
		service.createOrUpdateReport(report);
	}

	@PutMapping("/update/{id}")
	public void updateReport(@RequestBody Report report) {
		try {
			Report searchedProjectStatus = service.findReport(report.getReportID());
			if (searchedProjectStatus.getReportID() != null) {
				service.createOrUpdateReport(report);
			}
		} catch (NoSuchElementException e) {

		}
	}

	@DeleteMapping("/delete/{id}")
	public void deleteReport(@PathVariable Integer id) {
		try {
			Report report = service.findReport(id);
			if (report.getReportID() != null) {
				service.deleteReport(report);
			}
		} catch (NoSuchElementException e) {

		}
	}
}

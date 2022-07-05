package com.pfe.projectMonitoringBE.interfaces;

import java.util.List;

import com.pfe.projectMonitoringBE.entities.Report;
import com.pfe.projectMonitoringBE.models.ReportModel;

public interface IReport {
	public void createOrUpdateReport(Report report);

	public Report findReport(int idReport);

	public List<Report> getAllReport();

	public void deleteReport(Report report);

	List<Report> findByMember(String email);
	public Report transformReportModelToReport(ReportModel reportModel, byte[] pdfBytes);
}

package com.pfe.projectMonitoringBE.interfaces;

import java.util.List;

import com.pfe.projectMonitoringBE.entities.File;

public interface IFile {
	public void addFiles(List<File> files);

	public List<File> getAllFiles();

	public void addOrUpdateFile(File file);
}

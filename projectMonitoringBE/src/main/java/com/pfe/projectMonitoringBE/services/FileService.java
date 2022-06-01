package com.pfe.projectMonitoringBE.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pfe.projectMonitoringBE.entities.Category;
import com.pfe.projectMonitoringBE.entities.File;
import com.pfe.projectMonitoringBE.interfaces.IFile;
import com.pfe.projectMonitoringBE.interfaces.ITaskComment;
import com.pfe.projectMonitoringBE.repositories.FileRepository;

@Service
public class FileService implements IFile {

	@Autowired
	private FileRepository repository;

	@Override
	public void addFiles(List<File> files) {
		repository.saveAll(files);

	}

	@Override
	public void addOrUpdateFile(File file) {
		repository.save(file);

	}

	@Override
	public List<File> getAllFiles() {
		return repository.findAll();
	}

}

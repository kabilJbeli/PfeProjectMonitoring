package com.pfe.projectMonitoringBE.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pfe.projectMonitoringBE.entities.File;
import com.pfe.projectMonitoringBE.interfaces.IFile;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(value = "/file")
public class FileController {

	@Autowired
	private IFile service;

	@PostMapping("/add")
	public void addFiles(@RequestBody List<File> files) {
		service.addFiles(files);
	}

	@PostMapping("/addSingleFile")
	public void addFile(@RequestBody File file) {
		service.addOrUpdateFile(file);
	}

	@GetMapping("/all")
	public List<File> getAll() {
		return service.getAllFiles();
	}
	
}

package com.pfe.projectMonitoringBE.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.pfe.projectMonitoringBE.entities.Member;
import com.pfe.projectMonitoringBE.entities.Task;
import com.pfe.projectMonitoringBE.interfaces.IProject;
import com.pfe.projectMonitoringBE.interfaces.ITask;
import com.pfe.projectMonitoringBE.models.ProjectStats;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(value = "/dashbord")
public class DashbordController {
	
	@Autowired
	public IProject projet; 
	
	@Autowired
	public ITask taskService;
	
	@GetMapping("/projectStatutsstats")
	public List<ProjectStats> getProjectstats (){
		return projet.getProjectsStats();
	}
	
	
	@GetMapping("/projectStatutsstatsperCustomer")
	public List<ProjectStats> getProjectstatsperClient (@RequestBody Member client){
		return projet.getNumberClientPerProject(client);
	}
	
	@GetMapping("/projectStatutsstatsperEmployee")
	public List<ProjectStats> getProjectstatsperEmployee (@RequestBody Member client){
		return projet.getNumberEmployeePerProject(client);
	}
	
	@GetMapping("/projectStatutsstatsperManager")
	public List<ProjectStats> getProjectstatsperManager (@RequestBody Member client){
		return projet.getNumberManagerPerProject(client);
	}
	@GetMapping("/getRiskyTask")
	public List<Task> getRiskyTask (){
		return taskService.getRiskyTask();
	}
	
	
	
}

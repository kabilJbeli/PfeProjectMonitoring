package com.pfe.projectMonitoringBE.controllers;

import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.launch.JobLauncher;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pfe.projectMonitoringBE.Enums.Roles;
import com.pfe.projectMonitoringBE.Enums.SprintStatus;
import com.pfe.projectMonitoringBE.Enums.TaskStatus;
import com.pfe.projectMonitoringBE.batch.SprintJobExecutionListener;
import com.pfe.projectMonitoringBE.entities.Sprint;
import com.pfe.projectMonitoringBE.entities.Task;
import com.pfe.projectMonitoringBE.interfaces.ISprint;
import com.pfe.projectMonitoringBE.interfaces.ITask;
import com.pfe.projectMonitoringBE.models.ProjectSprintStats;
import com.pfe.projectMonitoringBE.models.SprintModel;
import com.pfe.projectMonitoringBE.models.SprintStats;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(value = "/sprint")
public class SprintController {
	
    private static final Logger LOGGER = LoggerFactory.getLogger(SprintJobExecutionListener.class);


	@Autowired
	private ISprint service;

	@Autowired
	private ITask serviceTask;
	
    @Autowired
    JobLauncher jobLauncher;

    @Autowired
    Job job;

	@GetMapping("/getAllSprintByStatus")
	public SprintModel getAllSprintByStatus() {
		return service.getAllSprintByStatus();
	}

	@GetMapping("/getSprintByStatus")
	public SprintModel getManagerSprintByStatus(@RequestParam String email) {
		return service.getSprintByStatus(email);
	}

	@GetMapping("/getClientSprintByStatus")
	public SprintModel getClientSprintByStatus(@RequestParam String email) {
		return service.getClientSprintByStatus(email);
	}

	@GetMapping("/getEmployeeSprintByStatus")
	public SprintModel getEmployeeSprintByStatus(@RequestParam String email) {
		return service.getEmployeeSprintByStatus(email);
	}

	@GetMapping("/all")
	public List<Sprint> getAll() {
		return service.getAllSprint();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Sprint> getSprintById(@PathVariable Integer id) {
		try {
			Sprint sprint = service.findSprint(id);
			return new ResponseEntity<Sprint>(sprint, HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<Sprint>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/add")
	public void addSprint(@RequestBody Sprint sprint) {	

		service.createOrUpdateSprint(service.updateSprintPeriod(sprint));	
		attachTasksToSprint(sprint);

	}

	@PutMapping("/update/{id}")
	public void updateSprint(@RequestBody Sprint sprint) {
		try {
			Sprint searchedSprint = service.findSprint(sprint.getSprintID());
			if (searchedSprint.getSprintID() != null) {
				service.createOrUpdateSprint(sprint);
			}
		} catch (NoSuchElementException e) {

		}
	}

	@DeleteMapping("/delete/{id}")
	public void deleteSprint(@PathVariable Integer id) {
		try {
			Sprint sprint = service.findSprint(id);
			if (sprint.getSprintID() != null) {
				service.deleteSprint(sprint);
			}
		} catch (NoSuchElementException e) {

		}
	}

	@GetMapping("/getTasksBySprintId")
	public List<Task> getTasksBySprintId(@RequestParam Integer sprintID) {
		return service.getTasksBySprintId(sprintID);
	}

	@GetMapping("/getProjectSprintStats")
	public List<ProjectSprintStats> getProjectSprintStats(@RequestParam Roles role, @RequestParam String email) {
		List<ProjectSprintStats> stats = new ArrayList<ProjectSprintStats>();

		switch (role) {

		case ADMINISTRATOR: {
			stats.add(service.calculationProjectSprintStats(service.findSprintByStatus(SprintStatus.Created),
					SprintStatus.Created));
			stats.add(service.calculationProjectSprintStats(service.findSprintByStatus(SprintStatus.InProgress),
					SprintStatus.InProgress));
			stats.add(service.calculationProjectSprintStats(service.findSprintByStatus(SprintStatus.Done),
					SprintStatus.Done));
			break;
		}
		case MANAGER: {

			stats.add(service.calculationProjectSprintStats(
					service.findManagerSprintByStatus(email, SprintStatus.Created), SprintStatus.Created));
			stats.add(service.calculationProjectSprintStats(
					service.findManagerSprintByStatus(email, SprintStatus.InProgress), SprintStatus.InProgress));
			stats.add(service.calculationProjectSprintStats(service.findManagerSprintByStatus(email, SprintStatus.Done),
					SprintStatus.Done));
			break;
		}
		case CLIENT: {

			stats.add(service.calculationProjectSprintStats(
					service.findClientSprintByStatus(email, SprintStatus.Created), SprintStatus.Created));
			stats.add(service.calculationProjectSprintStats(
					service.findClientSprintByStatus(email, SprintStatus.InProgress), SprintStatus.InProgress));
			stats.add(service.calculationProjectSprintStats(service.findClientSprintByStatus(email, SprintStatus.Done),
					SprintStatus.Done));
			break;
		}
		case EMPLOYEE: {

			stats.add(service.calculationProjectSprintStats(
					service.findEmployeeSprintByStatus(email, SprintStatus.Created), SprintStatus.Created));
			stats.add(service.calculationProjectSprintStats(
					service.findEmployeeSprintByStatus(email, SprintStatus.InProgress), SprintStatus.InProgress));
			stats.add(service.calculationProjectSprintStats(
					service.findEmployeeSprintByStatus(email, SprintStatus.Done), SprintStatus.Done));
			break;
		}
		default: {
			break;
		}

		}
		return stats;
	}

	@GetMapping("/getCurrentSprintStats")
	public List<SprintStats> getSprintStats(@RequestParam Integer sprintID) {
		List<Task> tasks = service.getTasksBySprintId(sprintID);
	
		return transformSprintStats(tasks,sprintID);

	}
	


	@GetMapping("/getCurrentSprintByProject")
	public List<Sprint> getProjectCurrentSprint(@RequestParam Integer projectID) {
		return service.getProjectCurrentSprint(projectID);
	}

	@GetMapping("/getProjectSprints")
	public List<Sprint> getProjectSprints(@RequestParam Integer projectID) {
		return service.getProjectSprints(projectID);
	}

	@GetMapping("/getProjectCurrentSprintByEndAndStartDates")
	public ResponseEntity<Sprint> getProjectCurrentSprintByEndAndStartDates(@RequestParam Integer projectID) {

		try {
			Sprint sprint = service.getProjectCurrentSprintByEndAndStartDates(projectID);
			return new ResponseEntity<Sprint>(sprint, HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<Sprint>(HttpStatus.NOT_FOUND);
		}

	}

	@GetMapping("/getProjectCurrentSprintEndDate")
	public ResponseEntity<LocalDateTime> getProjectCurrentSprintEndDate(@RequestParam Integer projectID) {

		try {
			Sprint sprint = service.getProjectCurrentSprintByEndAndStartDates(projectID);
			if (sprint != null) {
				return new ResponseEntity<LocalDateTime>(sprint.getSprintEndDate(), HttpStatus.OK);

			} else {
				return new ResponseEntity<LocalDateTime>(HttpStatus.NOT_FOUND);

			}
		} catch (NoSuchElementException e) {
			return new ResponseEntity<LocalDateTime>(HttpStatus.NOT_FOUND);
		}

	}
	
	
    @GetMapping(value = "/trigger/start")
    public String invokeBatch() {
        //
        long start = System.currentTimeMillis();

        JobParameters jobParameters = new JobParametersBuilder().addLong("time", System.currentTimeMillis()).toJobParameters();

        long end = System.currentTimeMillis();

        NumberFormat formatter = new DecimalFormat("#0.00000");
        System.out.print("Execution time is " + formatter.format((end - start) / 1000d) + " seconds");
        LOGGER.info("loader Execution time is " + formatter.format((end - start) / 1000d) + " seconds");


        try {
            jobLauncher.run(job, jobParameters);
        } catch (Exception e) {
            e.printStackTrace();
            LOGGER.error("BatchTriggerController Exception "+e.getMessage());
            return "Fail";
        }
        return "Success";
    }
    
    
 
    
	private List<SprintStats>  transformSprintStats(List<Task> tasks,Integer sprintID) {
		
		List<SprintStats> sprintStats = new ArrayList<SprintStats>();

		sprintStats.add(service.calculation(serviceTask.findByTaskStatus(TaskStatus.ToDo, sprintID), TaskStatus.ToDo));

		sprintStats.add(service.calculation(serviceTask.findByTaskStatus(TaskStatus.Done, sprintID), TaskStatus.Done));

		sprintStats.add(service.calculation(serviceTask.findByTaskStatus(TaskStatus.InProgress, sprintID),
				TaskStatus.InProgress));

		sprintStats.add(service.calculation(serviceTask.findByTaskStatus(TaskStatus.ReadyForRelease, sprintID),
				TaskStatus.ReadyForRelease));

		sprintStats.add(
				service.calculation(serviceTask.findByTaskStatus(TaskStatus.Released, sprintID), TaskStatus.Released));

		sprintStats.add(
				service.calculation(serviceTask.findByTaskStatus(TaskStatus.Testing, sprintID), TaskStatus.Testing));

		sprintStats.add(service.calculation(serviceTask.findByTaskStatus(TaskStatus.Validating, sprintID),
				TaskStatus.Validating));
		return sprintStats;

	}
	
	private void attachTasksToSprint(Sprint sprint) {
		sprint.getTask().forEach(task -> {
			task.setSprint(sprint);
			serviceTask.createOrUpdateTask(task);
		});
	}

}

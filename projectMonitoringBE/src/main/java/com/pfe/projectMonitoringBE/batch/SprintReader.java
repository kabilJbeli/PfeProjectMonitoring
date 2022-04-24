package com.pfe.projectMonitoringBE.batch;

import java.util.Iterator;
import java.util.List;

import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.NonTransientResourceException;
import org.springframework.batch.item.ParseException;
import org.springframework.batch.item.UnexpectedInputException;
import org.springframework.beans.factory.annotation.Autowired;

import com.pfe.projectMonitoringBE.entities.Sprint;
import com.pfe.projectMonitoringBE.services.SprintService;

public class SprintReader implements ItemReader<Sprint> {
	
	@Autowired
	SprintService sprintservice;

	@Override
	public Sprint read() throws Exception, UnexpectedInputException, ParseException, NonTransientResourceException {
		List<Sprint> sprints = sprintservice.getAllSprint();
		Iterator<Sprint> sprintsite = sprints.iterator();
		return sprintsite.next();
	}


}

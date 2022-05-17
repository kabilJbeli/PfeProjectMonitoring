package com.pfe.projectMonitoringBE.batch;

import java.util.Iterator;
import java.util.List;

import org.springframework.batch.core.StepExecution;
import org.springframework.batch.core.annotation.BeforeStep;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.NonTransientResourceException;
import org.springframework.batch.item.ParseException;
import org.springframework.batch.item.UnexpectedInputException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;

import com.pfe.projectMonitoringBE.entities.Sprint;
import com.pfe.projectMonitoringBE.services.SprintService;

public class SprintReader implements ItemReader<Sprint> {
	
	@Autowired
	SprintService sprintservice;
	
	Iterator<Sprint> sprintsite ;
    
	@BeforeStep
    public void before(StepExecution stepExecution) {
		sprintsite = sprintservice.getAllSprint().iterator();
    }
	@Override
	public Sprint read() throws Exception, UnexpectedInputException, ParseException, NonTransientResourceException {
        if (sprintsite != null && sprintsite.hasNext()) {
            return sprintsite.next();
        } else {
            return null;
        }
	}

}

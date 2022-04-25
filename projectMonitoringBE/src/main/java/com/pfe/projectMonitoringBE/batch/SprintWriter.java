package com.pfe.projectMonitoringBE.batch;

import java.util.List;

import org.springframework.batch.item.ItemWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;

import com.pfe.projectMonitoringBE.entities.Sprint;
import com.pfe.projectMonitoringBE.services.SprintService;

public class SprintWriter implements ItemWriter<Sprint> {
	@Autowired
	SprintService sprintservice;

	@Override
	public void write(List<? extends Sprint> items) throws Exception {
		sprintservice.saveAll(items);		
	}

}

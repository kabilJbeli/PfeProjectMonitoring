package com.pfe.projectMonitoringBE.batch;

import java.time.LocalDateTime;

import org.springframework.batch.item.ItemProcessor;
import org.springframework.context.annotation.Bean;

import com.pfe.projectMonitoringBE.Enums.SprintStatus;
import com.pfe.projectMonitoringBE.entities.Sprint;

public class SprintProcessor implements ItemProcessor<Sprint, Sprint> {

	@Override
	public Sprint process(Sprint item) throws Exception {
		if (item.getSprintEndDate().isBefore(LocalDateTime.now()) &&  item.getStatus().equals(SprintStatus.InProgress)) {
				item.setStatus(SprintStatus.Done);
				}
		else if(item.getSprintStartDate().isEqual(LocalDateTime.now()) && item.getStatus().equals(SprintStatus.Created) ||
				item.getSprintEndDate().isAfter(LocalDateTime.now()) && item.getSprintStartDate().isBefore(LocalDateTime.now())
				&& item.getStatus().equals(SprintStatus.Created)
				) {
			item.setStatus(SprintStatus.InProgress);			
		}
		
		return item;
	}

}

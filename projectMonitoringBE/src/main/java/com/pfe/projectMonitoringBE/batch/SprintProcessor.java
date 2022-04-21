package com.pfe.projectMonitoringBE.batch;

import java.time.LocalDateTime;

import org.springframework.batch.item.ItemProcessor;

import com.pfe.projectMonitoringBE.Enums.SprintStatus;
import com.pfe.projectMonitoringBE.entities.Sprint;

public class SprintProcessor implements ItemProcessor<Sprint, Sprint> {

	@Override
	public Sprint process(Sprint item) throws Exception {
		if (item.getSprintEndDate().isBefore(LocalDateTime.now()))
				item.setStatus(SprintStatus.Done);
		return item;
	}

}

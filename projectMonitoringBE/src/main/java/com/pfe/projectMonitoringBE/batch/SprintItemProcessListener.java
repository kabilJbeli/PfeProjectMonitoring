package com.pfe.projectMonitoringBE.batch;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.ItemProcessListener;

import com.pfe.projectMonitoringBE.entities.Sprint;

public class SprintItemProcessListener implements ItemProcessListener<Sprint, Sprint> {
	
    private static final Logger LOGGER = LoggerFactory.getLogger(SprintItemProcessListener.class);


	@Override
	public void beforeProcess(Sprint item) {
        LOGGER.info("beforeProcess");		
	}

	@Override
	public void afterProcess(Sprint item, Sprint result) {
		LOGGER.info("afterProcess: ID Sprint" + item.getSprintID() + " ID Projet " + item.getProject().getProjectID()
				+ " Sprint old status " + item.getStatus().name() + " ---> " + " ID Sprint " + result.getSprintID()
				+ " ID Projet " + result.getProject().getProjectID() + " Sprint new status "
				+ result.getStatus().name());
	}

	@Override
	public void onProcessError(Sprint item, Exception e) {
        LOGGER.info("onProcessError" + item.getSprintID(), e);		
	}

}

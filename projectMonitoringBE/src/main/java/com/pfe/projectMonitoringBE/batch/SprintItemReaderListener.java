package com.pfe.projectMonitoringBE.batch;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.ItemReadListener;

import com.pfe.projectMonitoringBE.entities.Sprint;

public class SprintItemReaderListener implements ItemReadListener<Sprint> {
    private static final Logger LOGGER = LoggerFactory.getLogger(SprintItemReaderListener.class);

	@Override
	public void beforeRead() {
        LOGGER.info("beforeRead");		
	}

	@Override
	public void afterRead(Sprint item) {
        LOGGER.info("afterRead: Sprint ID " + item.getSprintID());
		
	}

	@Override
	public void onReadError(Exception ex) {
        LOGGER.info("onReadError" , ex);		
	}

}

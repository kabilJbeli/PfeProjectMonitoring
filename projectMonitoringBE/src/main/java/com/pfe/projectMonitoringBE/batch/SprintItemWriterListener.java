package com.pfe.projectMonitoringBE.batch;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.ItemWriteListener;

import com.pfe.projectMonitoringBE.entities.Sprint;

public class SprintItemWriterListener implements ItemWriteListener<Sprint> {

    private static final Logger LOGGER = LoggerFactory.getLogger(SprintItemWriterListener.class);

    @Override
    public void beforeWrite(List<? extends Sprint> list) {
        LOGGER.info("beforeWrite");
    }

    @Override
    public void afterWrite(List<? extends Sprint> list) {
        for (Sprint sprint : list) {
            LOGGER.info("afterWrite : Sprint ID " + sprint.getSprintID());
        }
    }

    @Override
    public void onWriteError(Exception e, List<? extends Sprint> list) {
        LOGGER.info("onWriteError");
    }
}
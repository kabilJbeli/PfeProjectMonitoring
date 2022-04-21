package com.pfe.projectMonitoringBE.batch;

import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.ItemWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;

import com.pfe.projectMonitoringBE.entities.Sprint;
public class BatchConfig {
	

    @Autowired
    private StepBuilderFactory steps;
    
    @Autowired
    SprintProcessor sprintProcessor;
    
    @Autowired 
    SprintReader SprintReader;
    
    @Autowired
    SprintWriter sprintWriter;
    

    @Bean
    protected Step step1() {
        return steps.get("Update sprints")
            .<Sprint, Sprint> chunk(10000)
            .reader(SprintReader)
            .processor(sprintProcessor)
            .writer(sprintWriter)
            .build();
    }

}

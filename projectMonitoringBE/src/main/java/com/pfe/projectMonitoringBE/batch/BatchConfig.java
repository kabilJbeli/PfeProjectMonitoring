package com.pfe.projectMonitoringBE.batch;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.pfe.projectMonitoringBE.entities.Sprint;

//@Configuration 
//@EnableBatchProcessing 
public class BatchConfig {

	@Autowired
	private JobBuilderFactory jobs;

	@Autowired
	private StepBuilderFactory stepBuilderFactory;

	@Bean
	public Job job(@Qualifier("step1") Step step1) {
		return jobs.get("myJob").start(step1).build();
	}

	@Autowired
	SprintProcessor sprintProcessor;
	


	@Autowired
	SprintReader sprintReader;

	@Autowired
	SprintWriter sprintWriter;
	
	
	@Bean
    public SprintProcessor sprintProcessor() {
        return  sprintProcessor;
    }
	
	@Bean
    public SprintReader sprintReader() {
        return  sprintReader;
    }

	
	@Bean
    public SprintWriter sprintWriter() {
        return sprintWriter;
    }


	@Bean
	protected Step step1() {
		return stepBuilderFactory.get("Update sprints").<Sprint, Sprint>chunk(10000).reader(sprintReader())
				.processor(sprintProcessor()).writer(sprintWriter()).build();
	}

}

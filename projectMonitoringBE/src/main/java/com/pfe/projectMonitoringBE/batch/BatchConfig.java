package com.pfe.projectMonitoringBE.batch;

import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.batch.core.launch.support.SimpleJobLauncher;
import org.springframework.batch.core.step.tasklet.TaskletStep;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.pfe.projectMonitoringBE.entities.Sprint;

@Component
@EnableBatchProcessing
@EnableScheduling
public class BatchConfig {
	private static final Logger LOGGER = LoggerFactory.getLogger(SprintJobExecutionListener.class);

	@Autowired
	public JobBuilderFactory jobBuilderFactory;

	@Autowired
	public StepBuilderFactory stepBuilderFactory;

	@Autowired
	JobLauncher jobLauncher;

	@Autowired
	Job job;

	@Bean
	public SprintReader reader() {
		return new SprintReader();
	}

	@Bean
	public SprintProcessor processor() {
		return new SprintProcessor();
	}

	@Bean
	public SprintWriter writer() {
		return new SprintWriter();
	}

	@Bean
	public SprintJobExecutionListener jobExecutionListener() {
		return new SprintJobExecutionListener();
	}

	@Bean
	public SprintItemReaderListener readerListener() {
		return new SprintItemReaderListener();
	}

	@Bean
	public SprintItemProcessListener processListener() {
		return new SprintItemProcessListener();
	}

	@Bean
	public SprintItemWriterListener writerListener() {
		return new SprintItemWriterListener();
	}

	@Bean
	public Job job(Step step, SprintJobExecutionListener jobExecutionListener) {
		Job job = jobBuilderFactory.get("Sprint").listener(jobExecutionListener).flow(step).end().build();
		return job;
	}

	@Scheduled(cron = "@midnight")
	//@Scheduled(fixedRate = 5000)
	public void perform() throws Exception {
		System.out.print("I'm working");
		JobParameters params = new JobParametersBuilder()
				.addString("Sprint", String.valueOf(System.currentTimeMillis())).toJobParameters();

		long end = System.currentTimeMillis();
		long start = System.currentTimeMillis();

		NumberFormat formatter = new DecimalFormat("#0.00000");
		System.out.print("Execution time is " + formatter.format((end - start) / 1000d) + " seconds");
		LOGGER.info("loader Execution time is " + formatter.format((end - start) / 1000d) + " seconds");

		try {
			jobLauncher.run(job, params);
		} catch (Exception e) {
			e.printStackTrace();
			LOGGER.error("BatchTriggerController Exception " + e.getMessage());
		}
	}

	@Bean
	public Step step(SprintReader reader, SprintWriter writer, SprintProcessor processor,
			SprintItemReaderListener readerListener, SprintItemProcessListener processListener,
			SprintItemWriterListener writerListener) {

		TaskletStep step = stepBuilderFactory.get("Sprint").<Sprint, Sprint>chunk(100).reader(reader)
				.processor(processor).writer(writer).listener(readerListener).listener(processListener)
				.listener(writerListener).build();
		return step;
	}

}

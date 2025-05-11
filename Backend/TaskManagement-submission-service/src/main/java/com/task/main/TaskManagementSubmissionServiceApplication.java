package com.task.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class TaskManagementSubmissionServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(TaskManagementSubmissionServiceApplication.class, args);
	}

}

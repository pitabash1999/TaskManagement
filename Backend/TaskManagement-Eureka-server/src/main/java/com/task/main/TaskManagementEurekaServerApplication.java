package com.task.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class TaskManagementEurekaServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(TaskManagementEurekaServerApplication.class, args);
	}

}

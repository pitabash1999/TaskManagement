package com.task.main.service.interFace;

import com.task.main.dto.TaskDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "TASK-SERVICE",url = "http://localhost:2001")
public interface TaskService {

    @GetMapping("/api/task/{taskId}")
    public TaskDto getTaskById(@PathVariable Long taskId);



    @PutMapping("/api/task/updateComplete/{id}")
    public TaskDto completeTask(@PathVariable Long id);
}

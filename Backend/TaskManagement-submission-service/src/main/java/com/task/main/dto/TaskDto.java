package com.task.main.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskDto {

    private Long id;
    private String title;
    private String description;
    private String image;
    private Long assignedToId;

    private List<String> tags=new ArrayList<>();

    private TaskStatus status;

    private LocalDateTime creationDate;

    private LocalDateTime deadLine;
}

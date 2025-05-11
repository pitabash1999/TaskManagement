package com.task.main.service.impl;

import com.task.main.model.Task;
import com.task.main.model.TaskStatus;
import com.task.main.repository.TaskRepository;
import com.task.main.service.interFace.TaskService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    public TaskServiceImpl(TaskRepository taskRepository){
        this.taskRepository=taskRepository;
    }

    @Override
    public Task createTask(Task task, String requestRole) throws Exception {

        if(!requestRole.equals("ROLE_ADMIN")){
            throw new Exception("Only admins are allowed to create tasks");
        }

        task.setCreationDate(LocalDateTime.now());
        task.setStatus(TaskStatus.PENDING);

        return taskRepository.save(task);
    }

    @Override
    public Task getTaskById(Long id) throws Exception {
        return taskRepository.findById(id).orElseThrow(()->new Exception("Task not found"));
    }

    @Override
    public List<Task> getAllTasks(TaskStatus status) {

        List<Task> list = taskRepository.findAll();

        return list.stream().filter(task ->
                status==null || task.getStatus().name().equalsIgnoreCase(status.toString()))
                .collect(Collectors.toList());
    }

    @Override
    public Task updateTask(Long id, Task updatedTask, String requestRole) throws Exception {

        if(!requestRole.equals("ROLE_ADMIN")){
            throw new Exception("Only admins are allowed to update tasks");
        }

        Task task=getTaskById(id);

        if(updatedTask.getTitle()!=null){
            task.setTitle(updatedTask.getTitle());
        }

        if(updatedTask.getDescription()!=null){
            task.setDescription(updatedTask.getDescription());
        }

        if(updatedTask.getImage()!=null){
            task.setImage(updatedTask.getImage());
        }

        if(updatedTask.getStatus()!=null){
            task.setStatus(updatedTask.getStatus());
        }

        if(updatedTask.getDeadLine()!=null){
            task.setDeadLine(updatedTask.getDeadLine());
        }

        if(updatedTask.getTags()!=null){
            task.setTags(updatedTask.getTags());
        }

        return taskRepository.save(task);

    }

    @Override
    public void deleteTask(Long id){

        try {
            Task task=getTaskById(id);
            taskRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    @Override
    public Task assignedToUserId(Long userId, Long taskId) throws Exception {

        Task task=taskRepository.findById(taskId).orElseThrow(()->new Exception("Invalid id"));
        task.setAssignedToId(userId);


        return taskRepository.save(task);
    }

    @Override
    public List<Task> assignedUserTask(Long userId, TaskStatus status) {
        List<Task> list = taskRepository.findByassignedToId(userId);

        return list.stream().filter(task ->
                status==null || task.getStatus().name().equalsIgnoreCase(status.toString())
                ).collect(Collectors.toList());
    }


    @Override
    public Task completeTask(Long taskId) throws Exception {
        Task task=taskRepository.findById(taskId).orElseThrow(()->new Exception("Invalid task"));

        task.setStatus(TaskStatus.COMPLETE);

        return taskRepository.save(task);
    }
}

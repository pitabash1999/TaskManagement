package com.task.main.service.interFace;


import com.task.main.model.Task;
import com.task.main.model.TaskStatus;

import java.util.List;

public interface TaskService {

    //create task
    Task createTask(Task task,String requestRole)throws Exception;

    //get task by id
    Task getTaskById(Long id)throws Exception;

    //get all tasks (status is used for filtering purpose)
    List<Task> getAllTasks(TaskStatus status);

    //update  task
    Task updateTask(Long id,Task updatedTask,String requestRole)throws Exception;

    //delete a task
    void deleteTask(Long id);

    //To assign task to particular user
    Task assignedToUserId(Long userId,Long taskId)throws Exception;


    //get all tasks assigned to a particular user
    List<Task> assignedUserTask(Long userId,TaskStatus status);

    //complete task
    Task completeTask(Long taskId)throws Exception;
}

package com.task.main.controller;


import com.task.main.model.Task;
import com.task.main.model.TaskStatus;
import com.task.main.service.interFace.TaskService;
import com.task.main.service.interFace.UserService;
import com.task.main.user.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/task")
public class TaskController {

    @Autowired
    private TaskService taskService;
    @Autowired
    private UserService userService;

    @PostMapping("/createTask")
    public ResponseEntity<?> createTask(@RequestBody Task task,
                                           @RequestHeader("Authorization") String jwt) throws Exception {

        try{

            UserDto userDto = userService.getUser(jwt);
            Task task1=taskService.createTask(task,userDto.getRole());

            if(task1==null){
                return new ResponseEntity<>("Task not created", HttpStatus.INTERNAL_SERVER_ERROR);
            }

            return new ResponseEntity<>(task1,HttpStatus.CREATED);

        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getTaskById(@PathVariable("id") Long id){

        try {

            return ResponseEntity.ok().body(taskService.getTaskById(id));

        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }



    @GetMapping("/allTasks")
    public ResponseEntity<?> getAllTask(
            @RequestParam(required = false)TaskStatus status,
            @RequestHeader("Authorization") String jwt
    ){

        try {

            return ResponseEntity.ok().body(taskService.getAllTasks(status));

        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }


    @PatchMapping("/updateTask/{id}")
    public ResponseEntity<?> updateTask(
            @PathVariable("id")Long id,
            @RequestHeader("Authorization") String jwt,
            @RequestBody Task updatedTask
    ) throws Exception {

        try{

            UserDto user= userService.getUser(jwt);
            Task task=taskService.updateTask(id,updatedTask,user.getRole());

            return ResponseEntity.ok().body(task);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PatchMapping("/{id}/user/{userId}/assign")
    public ResponseEntity<?> assignedTaskToUserId(
            @PathVariable Long id,
            @PathVariable Long userId,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {

        try{

            UserDto user= userService.getUser(jwt);

            if(user==null || !user.getRole().equalsIgnoreCase("ROLE_ADMIN")){
                return ResponseEntity.badRequest().body("Only admin assign");
            }



            Task task=taskService.assignedToUserId(userId,id);

            return ResponseEntity.ok().body(task);

        } catch (Exception e) {

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/deleteTask/{id}")
    public ResponseEntity<?> deleteTask(
            @PathVariable("id")Long id
    ) throws Exception {

        try{

            taskService.deleteTask(id);
            return ResponseEntity.ok().body("Task deleted");


        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }



    @GetMapping("/assignedUserTask/{userId}")
    public ResponseEntity<?> assignedUserTasks(
            @PathVariable Long userId,
            @RequestParam(required = false)TaskStatus status,
            @RequestHeader("Authorization") String jwt
            ){

        try{



            return new ResponseEntity<>(taskService.assignedUserTask(userId,status),HttpStatus.OK);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    @PutMapping("/updateComplete/{id}")
    public ResponseEntity<?> updateComplete(@PathVariable Long id){

        try{

            return new ResponseEntity<>(taskService.completeTask(id),HttpStatus.OK);

        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }


}

package com.task.main.controller;


import com.task.main.service.interFace.SubmissionService;
import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@AllArgsConstructor
@RequestMapping("/api/submission")
public class SubmissionController {

    private SubmissionService submissionService;


    @PostMapping("/submit")
    public ResponseEntity<?> submitTask(
            @RequestParam Long taskId,
            @RequestParam String gitHubLink,
            @RequestHeader("Authorization") String jwt
    ){

        try{

            return ResponseEntity.ok().body(submissionService.submitTask(taskId,gitHubLink,jwt));

        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }


    }

    @GetMapping("/task/{taskId}")
    public ResponseEntity<?> getSubmissionById(@PathVariable Long taskId)
            throws Exception {

        try {
            return ResponseEntity.ok().body(submissionService.getSubmissionsByTaskId(taskId));
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/{submissionId}")
    public ResponseEntity<?> getSubMissionById(@PathVariable Long submissionId){

        try{

            return new ResponseEntity<>(submissionService.getSubmissionById(submissionId),
                    HttpStatus.OK);

        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }

    }

    @PatchMapping("/completeTask/{id}")
    public ResponseEntity<?> acceptDecline(
            @PathVariable Long id,
            @RequestParam String status,
            @RequestHeader("Authorization") String jwt
    ){
        try {

            return new ResponseEntity<>(submissionService.acceptDeclineSubmission(id,status,jwt),HttpStatus.OK);

        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.FORBIDDEN);
        }

    }
}

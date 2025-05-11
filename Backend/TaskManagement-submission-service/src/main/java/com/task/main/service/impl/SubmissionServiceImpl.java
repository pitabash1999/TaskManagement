package com.task.main.service.impl;

import com.task.main.dto.TaskDto;
import com.task.main.dto.TaskStatus;
import com.task.main.dto.UserDto;
import com.task.main.model.Submission;
import com.task.main.repository.SubmissionRepository;
import com.task.main.service.interFace.SubmissionService;
import com.task.main.service.interFace.TaskService;
import com.task.main.service.interFace.UserService;
import org.hibernate.SessionException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SubmissionServiceImpl implements SubmissionService {

    private final SubmissionRepository submissionRepository;
    private final TaskService taskService;
    private final UserService userService;

    public SubmissionServiceImpl(SubmissionRepository submissionRepository
            , TaskService taskService
            , UserService userService){
        this.submissionRepository=submissionRepository;
        this.taskService = taskService;
        this.userService = userService;
    }


    @Override
    public Submission submitTask(Long taskId, String gitHubLink, String jwt) throws Exception {

        try {

            if(jwt==null){
                throw new SessionException("Session Expired");
            }

            TaskDto taskDto=taskService.getTaskById(taskId);
            Submission sub=new Submission();

            if(taskDto==null){

                throw new Exception("Invalid task");
            }


            UserDto userDto=userService.getUser(jwt);

            Submission submission=new Submission();

            submission.setTaskId(taskId);
            submission.setStatus(TaskStatus.PENDING.toString());
            submission.setGitHubLink(gitHubLink);
            submission.setUserId(userDto.getId());
            submission.setSubmissionDate(LocalDateTime.now());

            return submissionRepository.save(submission);


        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }

    }

    @Override
    public Submission getSubmissionById(Long submissionId) throws Exception {

        return submissionRepository.findById(submissionId)
                .orElseThrow(()->new Exception("Invalid submission"));
    }

    @Override
    public List<Submission> getAllTaskSubmissions() {
        return submissionRepository.findAll();
    }

    @Override
    public List<Submission> getSubmissionsByTaskId(Long taskId)throws Exception{

        try {
            TaskDto taskDto=taskService.getTaskById(taskId);
            return submissionRepository.findByTaskId(taskDto.getId());
        } catch (Exception e) {
            throw new Exception("Invalid task");
        }
    }

    @Override
    public Submission acceptDeclineSubmission(Long id, String status,String jwt) throws Exception {

        UserDto userDto=userService.getUser(jwt);
        if(!userDto.getRole().equalsIgnoreCase("ROLE_ADMIN")){
            throw new Exception("Only admin can accept or decline");
        }

        Submission submission=getSubmissionById(id);

        if(status.equals(TaskStatus.COMPLETE.toString())){
            TaskDto taskDto=taskService.completeTask(submission.getTaskId());
            submission.setStatus(taskDto.getStatus().toString());
        }

        if(status.equals(TaskStatus.DECLINED.toString())){

            submission.setStatus(TaskStatus.DECLINED.toString());
        }


        return submissionRepository.save(submission);
    }
}

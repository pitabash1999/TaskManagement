package com.task.main.service.interFace;

import com.task.main.model.Submission;

import java.util.List;

public interface SubmissionService {

    Submission submitTask(Long taskId,String gitHubLink,String jwt)throws Exception;

    Submission getSubmissionById(Long submissionId)throws Exception;

    List<Submission> getAllTaskSubmissions();

    List<Submission> getSubmissionsByTaskId(Long taskId)throws Exception;

    Submission acceptDeclineSubmission(Long id,String status,String jwt)throws Exception;
}

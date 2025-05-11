package com.task.main.repository;

import com.task.main.model.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface SubmissionRepository extends JpaRepository<Submission,Long> {

    List<Submission> findByTaskId(Long taskId);
}

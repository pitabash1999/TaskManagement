package com.task.main.repository;

import com.task.main.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    boolean existsByEmail(String email);

    boolean existsByName(String name);

    User findByName(String name);
}

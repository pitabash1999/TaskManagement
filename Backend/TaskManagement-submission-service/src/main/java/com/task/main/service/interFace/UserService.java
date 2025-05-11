package com.task.main.service.interFace;

import com.task.main.dto.UserDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "USER-SERVICE",url = "http://localhost:2000")
public interface UserService {

    @GetMapping("/auth/getProfile")
    UserDto getUser(@RequestHeader("Authorization") String jwt);
}

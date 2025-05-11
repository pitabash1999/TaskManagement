package com.task.main.service.interFace;

import com.task.main.user.UserDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;

@FeignClient(name = "USER-SERVICE",url = "http://localhost:2000")
public interface UserService {


    @GetMapping("/auth/getProfile")
    UserDto getUser(@RequestHeader("Authorization") String jwt);

    @GetMapping("/auth/users")
    List<UserDto> getAllUsers(@RequestHeader("Authorization") String jwt);
}

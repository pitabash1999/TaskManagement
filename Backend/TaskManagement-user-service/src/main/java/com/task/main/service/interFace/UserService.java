package com.task.main.service.interFace;

import com.task.main.config.AuthResponse;
import com.task.main.dto.LoginBody;
import com.task.main.dto.UserDto;
import com.task.main.model.User;

import java.util.List;

public interface UserService {

    public UserDto register(User user);

    AuthResponse verify(LoginBody loginBody);

    List<UserDto> getUsers();

    UserDto getUserFromToken(String jwt)throws Exception;
}

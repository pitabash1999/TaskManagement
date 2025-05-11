package com.task.main.service.impl;

import com.task.main.config.AuthResponse;
import com.task.main.config.JWTutils;
import com.task.main.dto.LoginBody;
import com.task.main.dto.UserDto;
import com.task.main.exceptions.EmailAlreadyExistsException;
import com.task.main.exceptions.UsernameAlreadyExistsException;
import com.task.main.model.User;
import com.task.main.repository.UserRepository;
import com.task.main.service.interFace.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;
    private JWTutils jwTutils;

    @Override
    public UserDto register(User user) {

        if (userRepository.existsByName(user.getName())) {
            throw new UsernameAlreadyExistsException("Username already taken");
        }

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new EmailAlreadyExistsException("Email already registered");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);

        return new UserDto(savedUser);
    }

    @Override
    public AuthResponse verify(LoginBody loginBody) {


        try {
            Authentication authentication=authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginBody.getName(),
                            loginBody.getPassword())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            UserDetails userDetails= (UserDetails) authentication.getPrincipal();

            String jwt=jwTutils.generateToken(userDetails);

            return new AuthResponse(jwt);

        } catch (Exception e) {
            throw new BadCredentialsException("Invalid credentials");
        }

    }

    @Override
    public List<UserDto> getUsers() {

        List<User> list =userRepository.findAll();

        return list.stream().map(this::convertToDto).toList();
    }

    private UserDto convertToDto(User user){
        UserDto userDto=new UserDto();
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setEmail(user.getEmail());
        return userDto;
    }

    @Override
    public UserDto getUserFromToken(String jwt) throws Exception {


            if(jwt==null){
                throw new Exception("Invalid token");
            }

            if(jwt.startsWith("Bearer")){

                String token=jwt.substring(7);
                String name = jwTutils.getUserName(token);
                User user = userRepository.findByName(name);
                if (user == null) {
                    throw new Exception("User not found");
                }
                return new UserDto(user);

            }


       return null;
    }


}

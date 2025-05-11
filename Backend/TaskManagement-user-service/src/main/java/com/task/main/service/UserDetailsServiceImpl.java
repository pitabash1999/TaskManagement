package com.task.main.service;

import com.task.main.model.User;
import com.task.main.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService
{

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {


        try{
            User user = userRepository.findByName(name);
            return new UserDetailsImpl(user);
        }catch (Exception e){
            throw new UsernameNotFoundException("User not found with this name "+name);
        }
    }
}

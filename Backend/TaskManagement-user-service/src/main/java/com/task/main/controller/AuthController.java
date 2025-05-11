package com.task.main.controller;


import com.task.main.config.AuthResponse;
import com.task.main.dto.LoginBody;
import com.task.main.dto.RegisterDto;
import com.task.main.dto.UserDto;
import com.task.main.exceptions.EmailAlreadyExistsException;
import com.task.main.exceptions.UsernameAlreadyExistsException;
import com.task.main.model.User;
import com.task.main.service.interFace.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class AuthController {

    private UserService userService;


    @PostMapping("/signup")
    public ResponseEntity<?> register(@RequestBody RegisterDto registerDto){

        User user=new User();
        user.setName(registerDto.getName());
        user.setEmail(registerDto.getEmail());
        user.setPassword(registerDto.getPassword());
        user.setRole(registerDto.getRole().equals("ROLE_ADMIN")?"ROLE_ADMIN":"ROLE_USER");

        try {
            UserDto userDto = userService.register(user);
            return new ResponseEntity<>(userDto, HttpStatus.CREATED);
        } catch (UsernameAlreadyExistsException | EmailAlreadyExistsException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
       } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Registration failed");
        }


    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginBody loginBody) {
        try {
            AuthResponse token = userService.verify(loginBody);
            if (token == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Authentication failed");
            }
            return ResponseEntity.ok(token);
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred during authentication");
        }
    }
}

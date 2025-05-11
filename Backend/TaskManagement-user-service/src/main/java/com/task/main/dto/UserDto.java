package com.task.main.dto;


import com.task.main.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserDto {

    private Long id;
    private String name;
    private String email;
    private String role;

    public UserDto(User user) {
        this.id=user.getId();
        this.name=user.getName();
        this.email=user.getEmail();
        this.role=user.getRole();
    }
}

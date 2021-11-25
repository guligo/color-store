package me.guligo.cs.controllers;

import me.guligo.cs.dtos.UserDto;
import me.guligo.cs.services.UserService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    private final UserService userService;

    public UserController(final UserService userService) {
        this.userService = userService;
    }

    @CrossOrigin(origins = {
            "http://localhost:3000",
            "http://192.168.178.20:3000"
    })
    @GetMapping("/users/{userId}")
    public UserDto getUser(@PathVariable final String userId) {
        return userService.getUser(userId);
    }

    @CrossOrigin(origins = {
            "http://localhost:3000",
            "http://192.168.178.20:3000"
    })
    @PostMapping("/users/{userId}")
    public void updateUser(@PathVariable final String userId, @RequestBody final UserDto user) {
        userService.updateUser(userId, user);
    }

}

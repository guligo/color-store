package me.guligo.cs.controllers;

import javax.validation.Valid;
import me.guligo.cs.dtos.UserDto;
import me.guligo.cs.services.UserService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class UserController {

    private final UserService userService;

    public UserController(final UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users/{userId}")
    public UserDto getUser(@PathVariable final String userId) {
        return userService.getUser(userId);
    }

    @PostMapping("/users/{userId}")
    public void updateUser(@PathVariable final String userId, @Valid @RequestBody final UserDto user) {
        try {
            userService.updateUser(userId, user);
        } catch (final DataIntegrityViolationException exc) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Such alias already exists");
        }
    }

}

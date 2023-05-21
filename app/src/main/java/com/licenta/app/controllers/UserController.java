package com.licenta.app.controllers;

import com.licenta.app.dtos.UserDTO;
import com.licenta.app.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public UserDTO createUser(@RequestBody UserDTO userDTO) {
        return userService.createUser(userDTO);
    }

    @GetMapping("/{userId}")
    public UserDTO getUserById(@PathVariable Long userId) {
        return userService.getUserById(userId);
    }

    @PostMapping("/{userId}/foods/{foodId}")
    public void addFoodToUser(@PathVariable Long userId, @PathVariable Long foodId) {
        userService.addFoodToUser(userId, foodId);
    }

    @PostMapping("/{userId}/exercises/{exerciseId}")
    public void addExerciseToUser(@PathVariable Long userId, @PathVariable Long exerciseId) {
        userService.addExerciseToUser(userId, exerciseId);
    }

    @GetMapping()
    public List<UserDTO> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("login/{name}/{password}")
    public UserDTO login(@PathVariable String name,@PathVariable String password) {
        return userService.login(name, password);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok("User deleted successfully");
    }

}

package com.cardtrademarket.controller;

import com.cardtrademarket.model.User;
import com.cardtrademarket.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile/{username}")
    public ResponseEntity<User> getProfile(@PathVariable String username) {
        User user = userService.findByUsername(username);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/profile")
    public ResponseEntity<User> updateProfile(@RequestBody User userDetails) {
        User updatedUser = userService.updateProfile(userDetails);
        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping("/dashboard/{username}")
    public ResponseEntity<?> getDashboardData(@PathVariable String username) {
        return ResponseEntity.ok(userService.getDashboardData(username));
    }
}
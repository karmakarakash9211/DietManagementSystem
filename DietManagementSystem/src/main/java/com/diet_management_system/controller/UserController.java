package com.diet_management_system.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.diet_management_system.entity.User;
import com.diet_management_system.repository.UserRepository;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserRepository userRepository;

	@GetMapping("/profile")
	public User getProfile() {

		String email = SecurityContextHolder.getContext().getAuthentication().getName();

		User user = userRepository.findByEmail(email);

		if (user == null) {
			throw new RuntimeException("User not found");
		}

		return user;
	}

	@PutMapping("/profile")
	public User updateProfile(@RequestBody User updatedUser) {

		String email = SecurityContextHolder.getContext().getAuthentication().getName();

		User user = userRepository.findByEmail(email);

		if (user == null) {
			throw new RuntimeException("User not found");
		}

		user.setName(updatedUser.getName());
		user.setHeight(updatedUser.getHeight());
		user.setWeight(updatedUser.getWeight());
		user.setStatus(updatedUser.getStatus());

		return userRepository.save(user);
	}
}

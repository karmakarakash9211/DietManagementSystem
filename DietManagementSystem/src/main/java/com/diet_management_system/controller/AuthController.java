package com.diet_management_system.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.diet_management_system.config.JwtUtil;
import com.diet_management_system.entity.User;
import com.diet_management_system.repository.UserRepository;

@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private JwtUtil jwtUtil;

	@PostMapping("/register")
	public User register(@RequestBody User user) {

		System.out.println("USER RECEIVED: " + user);
		System.out.println("PASSWORD RECEIVED: " + user.getPassword());

		if (user.getPassword() == null || user.getPassword().isEmpty()) {
			throw new RuntimeException("Password cannot be empty");
		}
		user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
		
		if ("ADMIN".equals(user.getRole())) {
	        throw new RuntimeException("Admin cannot be self-registered");
	    }
		
		// user.setRole(Role.CHALLENGER);
		return userRepository.save(user);
	}

	@PostMapping("/login")
	public Map<String, Object> login(@RequestBody User loginRequest) {

		System.out.println("LOGIN REQUEST: " + loginRequest);

		if (loginRequest.getEmail() == null || loginRequest.getPassword() == null) {
			throw new RuntimeException("Email or Password is missing");
		}

		User user = userRepository.findByEmail(loginRequest.getEmail());

		if (user == null) {
			throw new RuntimeException("User not found");
		}

		if (!new BCryptPasswordEncoder().matches(loginRequest.getPassword(), user.getPassword())) {
			throw new RuntimeException("Invalid password");
		}

		String token = jwtUtil.generateToken(user.getEmail());

		Map<String, Object> response = new HashMap<>();
		response.put("token", token);
		response.put("role", user.getRole());

		// return response;
		return Map.of("token", token, "role", user.getRole().name());
	}
}

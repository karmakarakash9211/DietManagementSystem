package com.diet_management_system.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.diet_management_system.entity.DailyLog;
import com.diet_management_system.entity.User;
import com.diet_management_system.repository.DailyLogRepository;
import com.diet_management_system.repository.UserRepository;

import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/challenger")
public class ChallengerController {

	@Autowired
	private DailyLogRepository repo;

	@Autowired
	private UserRepository userRepository;

	@PostMapping("/log")
	public DailyLog addLog(@RequestBody DailyLog log) {

		String email = SecurityContextHolder.getContext().getAuthentication().getName();
		System.out.println("EMAIL FROM TOKEN: " + email);
		if (email == null) {
			throw new RuntimeException("User not authenticated");
		}
		User user = userRepository.findByEmail(email);

		if (user == null) {
			throw new RuntimeException("User not found in DB");
		}
		log.setUserId(user.getId());
		log.setDate(java.time.LocalDate.now());

		System.out.println("LOG RECEIVED: " + log);

		return repo.save(log);
	}

	@GetMapping("/logs")
	public List<DailyLog> getLogs() {
		return repo.findAll();
	}
}

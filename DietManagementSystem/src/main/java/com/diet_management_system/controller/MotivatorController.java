package com.diet_management_system.controller;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.diet_management_system.entity.DailyLog;
import com.diet_management_system.entity.User;
import com.diet_management_system.repository.DailyLogRepository;
import com.diet_management_system.repository.UserRepository;

@RestController
@RequestMapping("/motivator")
public class MotivatorController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private DailyLogRepository logRepository;

	@GetMapping("/users")
	public List<Map<String, Object>> getUserProgress() {

		List<User> users = userRepository.findAll();
		List<Map<String, Object>> result = new ArrayList<>();

		for (User user : users) {

			List<DailyLog> logs = logRepository.findByUserId(user.getId());

			logs.sort(Comparator.comparing(DailyLog::getDate));

			Double latestWeight = logs.size() > 0 ? logs.get(logs.size() - 1).getWeight() : null;

			Map<String, Object> data = new HashMap<>();
			data.put("name", user.getName());
			data.put("email", user.getEmail());
			data.put("latestWeight", latestWeight);
			data.put("totalLogs", logs.size());

			result.add(data);
		}

		return result;
	}

	@GetMapping("/logs/{userId}")
	public List<DailyLog> getLogsByUser(@PathVariable Long userId) {
		return logRepository.findByUserId(userId);
	}

	@PutMapping("/approve/{userId}")
	public String approveUser(@PathVariable Long userId) {
		User user = userRepository.findById(userId).orElse(null);

		if (user == null)
			return "User not found";

		user.setStatus("APPROVED");
		userRepository.save(user);

		return "User approved";
	}

	@PutMapping("/reject/{userId}")
	public String rejectUser(@PathVariable Long userId) {
		User user = userRepository.findById(userId).orElse(null);

		if (user == null)
			return "User not found";

		user.setStatus("REJECTED");
		userRepository.save(user);

		return "User rejected";
	}
}

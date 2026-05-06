package com.diet_management_system.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.diet_management_system.entity.Batch;
import com.diet_management_system.entity.DailyLog;
import com.diet_management_system.entity.User;
import com.diet_management_system.repository.BatchRepository;
import com.diet_management_system.repository.DailyLogRepository;
import com.diet_management_system.repository.UserRepository;
import com.diet_management_system.service.UserService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/admin")
public class AdminController {

	@Autowired
	private UserService userService;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private BatchRepository batchRepository;

	@Autowired
	private DailyLogRepository logRepo;

	@PostMapping("/approve/{id}")
	public String approve(@PathVariable Long id) {
		userService.approveUser(id);
		return "Approved";
	}

	@PostMapping("/reject/{id}")
	public String reject(@PathVariable Long id) {
		userService.rejectUser(id);
		return "Rejected";
	}

	@GetMapping("/users")
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

	@GetMapping("/stats")
	public Map<String, Object> getStats() {

		Map<String, Object> data = new HashMap<>();

		data.put("totalUsers", userRepository.count());
		data.put("totalLogs", logRepo.count());

		List<DailyLog> logs = logRepo.findAll();

		double avgWeight = logs.stream().filter(l -> l.getWeight() != null).mapToDouble(DailyLog::getWeight).average()
				.orElse(0);

		data.put("avgWeight", avgWeight);

		return data;
	}

	@GetMapping("/weight-trend")
	public List<DailyLog> getWeightTrend() {
		return logRepo.findAll();
	}

	@PostMapping("/batch")
	public Batch createBatch(@RequestBody Batch batch) {
		return batchRepository.save(batch);
	}

	@PostMapping("/assign")
	public String assignUser(@RequestParam Long userId, @RequestParam Long batchId) {

		User user = userRepository.findById(userId).orElseThrow();
		Batch batch = batchRepository.findById(batchId).orElseThrow();

		user.setBatch(batch);
		userRepository.save(user);

		return "User assigned to batch";
	}

	@GetMapping("/batches")
	public List<Batch> getAllBatches() {
		return batchRepository.findAll();
	}
}

package com.diet_management_system.controller;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.diet_management_system.entity.DailyLog;
import com.diet_management_system.entity.User;
import com.diet_management_system.repository.DailyLogRepository;
import com.diet_management_system.repository.UserRepository;

@RestController
@RequestMapping("/batch")
public class BatchController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private DailyLogRepository logRepo;

    @GetMapping("/{batchId}/leaderboard")
    public List<Map<String, Object>> leaderboard(@PathVariable Long batchId) {

        List<User> users = userRepo.findByBatch_Id(batchId);

        List<Map<String, Object>> result = new ArrayList<>();

        for (User u : users) {
            List<DailyLog> logs = logRepo.findByUserId(u.getId());

            Double latestWeight = logs.size() > 0
                ? logs.get(logs.size() - 1).getWeight()
                : null;

            Map<String, Object> map = new HashMap<>();
            map.put("name", u.getName());
            map.put("weight", latestWeight);

            result.add(map);
        }

        result.sort(Comparator.comparing(m -> (Double) m.get("weight")));

        return result;
    }
}
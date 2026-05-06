package com.diet_management_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.diet_management_system.entity.Batch;

public interface BatchRepository extends JpaRepository<Batch, Long> {
}

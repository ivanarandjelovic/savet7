package org.aivan.savet7.repository;

import java.util.List;

import org.aivan.savet7.model.Building;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


	@Repository
	public interface BuildingJpaRepository extends JpaRepository<Building, Long> {
		List<Building> findByName(String name);
	}

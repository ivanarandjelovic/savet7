package org.aivan.savet7.repository;

import java.util.List;

import org.aivan.savet7.model.Building;
import org.aivan.savet7.model.projections.BuildingInlineAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@Repository
@RepositoryRestResource(excerptProjection = BuildingInlineAddress.class)
public interface BuildingJpaRepository extends JpaRepository<Building, Long> {
	List<Building> findByNameLike(@Param("name") String name);
}

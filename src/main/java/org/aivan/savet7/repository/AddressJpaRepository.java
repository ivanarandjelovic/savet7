package org.aivan.savet7.repository;

import org.aivan.savet7.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressJpaRepository extends JpaRepository<Address, Long> {
}

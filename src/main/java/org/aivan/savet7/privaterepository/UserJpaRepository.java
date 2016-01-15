package org.aivan.savet7.privaterepository;

import org.aivan.savet7.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@Repository
@RepositoryRestResource(exported = false)
public interface UserJpaRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}

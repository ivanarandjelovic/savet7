package org.aivan.savet7.privateRepository;

import org.aivan.savet7.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserJpaRepository extends JpaRepository<User, Long> {
	User findByUsername( String username);

}

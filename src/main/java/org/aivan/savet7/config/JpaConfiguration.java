package org.aivan.savet7.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(basePackages = { "org.aivan.savet7.repository", "org.aivan.savet7.privaterepository" })
public class JpaConfiguration {

}

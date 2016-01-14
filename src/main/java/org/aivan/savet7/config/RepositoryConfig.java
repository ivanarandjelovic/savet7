package org.aivan.savet7.config;

import org.aivan.savet7.model.Address;
import org.aivan.savet7.model.Building;
import org.aivan.savet7.model.User;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;

@Configuration
public class RepositoryConfig extends RepositoryRestMvcConfiguration {

	/**
	 * We need this so that standard REST properties are read from application.properties
	 */
	@Override
	@ConfigurationProperties(prefix = "spring.data.rest")
	public RepositoryRestConfiguration config() {
		return super.config();
	}

	@Override
	protected void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
		config.exposeIdsFor(Building.class);
		config.exposeIdsFor(Address.class);
		config.exposeIdsFor(User.class);
	}

}
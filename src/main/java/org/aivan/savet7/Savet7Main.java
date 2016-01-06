package org.aivan.savet7;

import org.aivan.savet7.filter.SlowFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.embedded.FilterRegistrationBean;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Savet7Main extends SpringBootServletInitializer {

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(Savet7Main.class);
	}

	public static void main(String[] args) throws Exception {
		SpringApplication.run(Savet7Main.class, args);
	}

/*	@Bean
	public FilterRegistrationBean filterRegistrationBean() {
		FilterRegistrationBean registrationBean = new FilterRegistrationBean();
		SlowFilter slowFilter = new SlowFilter();
		registrationBean.setFilter(slowFilter);
		registrationBean.setOrder(1);
		return registrationBean;
	}*/
}
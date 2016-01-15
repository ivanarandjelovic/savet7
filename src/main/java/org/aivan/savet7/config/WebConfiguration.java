package org.aivan.savet7.config;

import org.aivan.savet7.security.UserController;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
@ComponentScan(basePackageClasses = { UserController.class })
public class WebConfiguration extends WebMvcConfigurerAdapter {

}

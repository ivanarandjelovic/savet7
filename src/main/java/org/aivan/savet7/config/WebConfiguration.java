package org.aivan.savet7.config;

import org.aivan.savet7.security.UserController;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
@ComponentScan(basePackageClasses = { UserController.class })
public class WebConfiguration extends WebMvcConfigurerAdapter {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // this is needed to enable development from a different server (front-end only). So maybe
        // this should be active only in development mode?
        registry.addMapping("/**").allowedOrigins("http://localhost:8081");
    }
}

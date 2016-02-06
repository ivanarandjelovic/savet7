package org.aivan.savet7.config;

import org.aivan.savet7.security.UserController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
@ComponentScan(basePackageClasses = { UserController.class })
public class WebConfiguration extends WebMvcConfigurerAdapter {

    @Autowired
    Savet7Configuration savet7Configuration;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // this is needed to enable development from a different server
        // (front-end only). So maybe
        // this should be active only in development mode?
//        if (savet7Configuration.isAllowCORS()) {
//            registry.addMapping("/**").allowedOrigins(savet7Configuration.getAllowCORSOrigin());
//        }
    }

    @Override
    public void addResourceHandlers(final ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**").addResourceLocations("classpath:public/").setCachePeriod(0);
        super.addResourceHandlers(registry);
    }
}

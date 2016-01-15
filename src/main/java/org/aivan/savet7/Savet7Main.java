package org.aivan.savet7;

import org.aivan.savet7.config.Savet7Configuration;
import org.aivan.savet7.filter.SlowFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.embedded.FilterRegistrationBean;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableConfigurationProperties(Savet7Configuration.class)
public class Savet7Main extends SpringBootServletInitializer {

    @Autowired
    Savet7Configuration savet7Configuration;

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(Savet7Main.class);
    }

    public static void main(String[] args) throws Exception {
        SpringApplication.run(Savet7Main.class, args);
    }

    @Bean
    public FilterRegistrationBean filterRegistrationBean() {
        FilterRegistrationBean registrationBean = new FilterRegistrationBean();
        SlowFilter slowFilter = new SlowFilter(savet7Configuration.isUseSlowFilter());
        registrationBean.setFilter(slowFilter);
        registrationBean.setOrder(1);
        return registrationBean;
    }
}
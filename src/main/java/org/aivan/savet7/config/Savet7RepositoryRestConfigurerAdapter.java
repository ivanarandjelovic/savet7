package org.aivan.savet7.config;

import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;
import org.springframework.web.servlet.mvc.method.annotation.ExceptionHandlerExceptionResolver;

public class Savet7RepositoryRestConfigurerAdapter extends RepositoryRestConfigurerAdapter {

    @Override
    public void configureExceptionHandlerExceptionResolver(ExceptionHandlerExceptionResolver exceptionResolver) {
        // TODO Auto-generated method stub
        super.configureExceptionHandlerExceptionResolver(exceptionResolver);
    }

}

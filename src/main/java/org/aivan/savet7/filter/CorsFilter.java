package org.aivan.savet7.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

public class CorsFilter implements  javax.servlet.Filter {

    /**
     * Is the filter enabled or not
     */
    private boolean enabled;

    public CorsFilter(boolean enabled) {
        super();
        this.enabled = enabled;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        if (enabled) {
            HttpServletResponse resp = (HttpServletResponse) response;
            resp.setHeader("Access-Control-Allow-Origin", "*");
            resp.setHeader("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE");
            resp.setHeader("Access-Control-Allow-Headers", "x-requested-with");
            resp.setHeader("Access-Control-Max-Age", "3600");
        }
        chain.doFilter(request, response);
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // There is no need to save filterConfig
    }

    @Override
    public void destroy() {
        // Nothing to do here :)
    }

}
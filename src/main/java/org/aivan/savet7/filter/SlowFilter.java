package org.aivan.savet7.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.aivan.savet7.config.Savet7Configuration;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SlowFilter implements javax.servlet.Filter {

	static Logger log = Logger.getLogger(SlowFilter.class);

	private static final long SLOW_DOWN_MS = 1000;

	@Autowired
	Savet7Configuration config;

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		// There is no need to save filterConfig
	}

	@Override
	public void destroy() {
		// Nothing to do here :)
	}

	/**
	 * Development filter to slow down each request, for testing UI in such
	 * conditions
	 * 
	 * @param request
	 * @param response
	 * @param chain
	 * @throws IOException
	 * @throws ServletException
	 */
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {

		String url = ((HttpServletRequest) request).getRequestURL().toString();

		if (config != null && config.isUseSlowFilter() && url.contains("/api")) {
			try {
				log.debug("Slowing down ... for " + SLOW_DOWN_MS + " milliseconds.");
				Thread.sleep(SLOW_DOWN_MS);
			} catch (InterruptedException ie) {
				log.warn("Interrupted!");
			}
		}
		chain.doFilter(request, response);
	}

}

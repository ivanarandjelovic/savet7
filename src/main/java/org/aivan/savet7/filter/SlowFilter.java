package org.aivan.savet7.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

public class SlowFilter implements javax.servlet.Filter {

	private static final long SLOW_DOWN_MS = 500;

	public FilterConfig filterConfig;

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		this.filterConfig = filterConfig;
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

		if (url.contains("/api")) {
			try {
				System.out.println("Slowing down ... for " + SLOW_DOWN_MS + " milliseconds.");
				Thread.sleep(SLOW_DOWN_MS);
			} catch (InterruptedException ie) {
				System.out.println("Interrupted!");
			}
		}
		chain.doFilter(request, response);
	}

	@Override
	public void destroy() {
		// TODO Auto-generated method stub

	}

}

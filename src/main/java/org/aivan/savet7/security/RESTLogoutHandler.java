package org.aivan.savet7.security;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Component;

@Component
public class RESTLogoutHandler implements LogoutHandler {

	static Logger log = Logger.getLogger(RESTLogoutHandler.class);
	
	@Override
	public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
		try {
			response.sendError(HttpServletResponse.SC_OK);
		} catch (IOException e) {
			log.warn("IOException when sending response code for successfull login", e);
			throw new RuntimeException(e);
		}
	}

}

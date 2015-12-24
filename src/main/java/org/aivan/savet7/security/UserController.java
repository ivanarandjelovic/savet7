package org.aivan.savet7.security;

import org.aivan.savet7.privateRepository.UserJpaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * Provides REST access to the user login service (and others)
 * 
 * DO NOT FORGET TO PUT Content-Type application/json HEADER
 */
@RestController
@RequestMapping(value = "/userService", produces = "application/json; charset=utf-8")
public class UserController {

	public static final String JSON = "application/json; charset=utf-8";

	@Autowired
	@Qualifier("authenticationManager")
	protected AuthenticationManager authenticationManager;

	@Autowired
	private UserJpaRepository userRepository;

	@RequestMapping(value = "/get", method = RequestMethod.GET, produces = JSON)
	public @ResponseBody UserBean get() {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		UserDetails userDetails = null;
		UserBean user = new UserBean();

		if (principal instanceof UserDetails) {
			userDetails = (UserDetails) principal;
			user.setUsername(userDetails.getUsername());
		}

		return user;
	}

	@RequestMapping(value = "/login", method = RequestMethod.POST, produces = JSON)
	public @ResponseBody String login(@RequestParam(value = "username", required = true) String username,
			@RequestParam(value = "password", required = true) String password) {
		System.out.println("username=" + username + ", password=" + password);

		String result = "NO";

		UserDetails userDetails = userRepository.findByUsername(username);

		if (userDetails != null) {

			UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(userDetails, password, userDetails.getAuthorities());
			Authentication authentication;
			try {
				authentication = authenticationManager.authenticate(token);
				SecurityContextHolder.getContext().setAuthentication(authentication);
				result = "OK";
			} catch (AuthenticationException e) {
				System.out.println("failed login for " + username);
			}

		}

		return result;
	}

}

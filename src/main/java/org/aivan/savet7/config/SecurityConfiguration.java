package org.aivan.savet7.config;

import org.aivan.savet7.security.DatabaseUserDetailsService;
import org.aivan.savet7.security.RESTAuthenticationEntryPoint;
import org.aivan.savet7.security.RESTAuthenticationFailureHandler;
import org.aivan.savet7.security.RESTAuthenticationSuccessHandler;
import org.aivan.savet7.security.RESTLogoutHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

	@Autowired
	private RESTAuthenticationEntryPoint authenticationEntryPoint;
	@Autowired
	private RESTAuthenticationFailureHandler authenticationFailureHandler;
	@Autowired
	private RESTAuthenticationSuccessHandler authenticationSuccessHandler;

	@Autowired
	private RESTLogoutHandler logoutHandler;

	@Autowired
	private DatabaseUserDetailsService userDetailsService;

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService);
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.formLogin().successHandler(authenticationSuccessHandler).failureHandler(authenticationFailureHandler).and()
				.csrf().disable().authorizeRequests().antMatchers("/userService/admin/**").access("hasRole('ADMIN')")
				.and().csrf().disable().authorizeRequests().antMatchers("/api/**")
				.access("hasRole('USER') or hasRole('ADMIN')").and().logout().addLogoutHandler(logoutHandler).and()
				.exceptionHandling().authenticationEntryPoint(authenticationEntryPoint);

	}

}
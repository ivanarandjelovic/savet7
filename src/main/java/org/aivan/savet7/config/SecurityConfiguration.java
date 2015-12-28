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

	/*
	 * @Bean public AuthenticationManager authenticationManager() throws
	 * Exception { return new AuthenticationManagerBuilder(new
	 * NopPostProcessor())
	 * .inMemoryAuthentication().withUser("user").password("password1").roles(
	 * "USER") .and().and().build(); }
	 */

	@Autowired
	private DatabaseUserDetailsService userDetailsService;

	/*
	 * @Bean public ProviderManager providerManager() {
	 * List<AuthenticationProvider> authProviders = new
	 * ArrayList<AuthenticationProvider>();
	 * authProviders.add(DatabaseUserDetailsService); ProviderManager pm = new
	 * ProviderManager( { userDetailsService}); retur pm }
	 */

	/*
	 * private static class NopPostProcessor implements ObjectPostProcessor {
	 * 
	 * @Override
	 * 
	 * @SuppressWarnings("unchecked") public Object postProcess(Object object) {
	 * return object; } };
	 */
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService);
	}

	@Override
	public void configure(WebSecurity web) throws Exception {
		// web.ignoring().antMatchers("/css/**", "/js/**", "/img/**",
		// "/fonts/**", "/*.html", "/",
		// "/partials/**");
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.formLogin().successHandler(authenticationSuccessHandler).failureHandler(authenticationFailureHandler).and()
				.csrf().disable().authorizeRequests().antMatchers("/api/**")
				.access("hasRole('USER') or hasRole('ADMIN')").and().logout().addLogoutHandler(logoutHandler).and()
				.exceptionHandling().authenticationEntryPoint(authenticationEntryPoint);

		// http.authorizeRequests().antMatchers("/api/**").access("hasRole('USER')
		// or hasRole('ADMIN')").and().csrf()
		// .disable().exceptionHandling().authenticationEntryPoint(authenticationEntryPoint).and().formLogin()
		// .successHandler(authenticationSuccessHandler).failureHandler(authenticationFailureHandler);
		// ;
	}

	/*
	 * @Bean public DatabaseUserDetailsService userDetailsService() { return
	 * userDetailsService; }
	 */
}
package org.aivan.savet7.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.ObjectPostProcessor;
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
	
	@Bean
    public AuthenticationManager authenticationManager() throws Exception {
        return new AuthenticationManagerBuilder(new NopPostProcessor())
                       .inMemoryAuthentication().withUser("user").password("password").roles("USER")
                       .and().and().build();
    }

	private static class NopPostProcessor implements ObjectPostProcessor {
        @Override
        @SuppressWarnings("unchecked")
        public Object postProcess(Object object) {
            return object;
        }
    };
    
	/*@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService);
	}
*/
    
    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/css/**", "/js/**", "/img/**", "/fonts/**", "/*.html", "/", "/partials/**");
    }
    
/*	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests().antMatchers("/api/**").hasRole("USER");
		http.httpBasic();
		http.csrf().disable();
	}*/
}
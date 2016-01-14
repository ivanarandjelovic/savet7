package org.aivan.savet7.model;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

/**
 * Simple POJO user for admin operations
 * 
 * @author aivan
 *
 */
@MappedSuperclass
public class BaseUser {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	Long id;

	@Column
	String username;
	@Column
	String password;
	@Column
	String role;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public static BaseUser fromUser(User u) {
		BaseUser bu = new BaseUser();
		bu.setId(u.getId());
		bu.setUsername(u.getUsername());
		bu.setPassword(u.getPassword());
		bu.setRole(u.getRole());
		return bu;
	}

	public User toUser() {
		User u = new User();
		u.setId(getId());
		u.setUsername(getUsername());
		u.setPassword(getPassword());
		u.setRole(getRole());
		return u;

	}
}

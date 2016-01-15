package org.aivan.savet7.security;

import org.springframework.web.bind.annotation.ResponseStatus;

import org.springframework.http.HttpStatus;

@ResponseStatus(code=HttpStatus.INTERNAL_SERVER_ERROR,reason="Unable to parse JSON request")
public class JsonParsingException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public JsonParsingException(String message, Throwable cause) {
		super(message, cause);
	}

}

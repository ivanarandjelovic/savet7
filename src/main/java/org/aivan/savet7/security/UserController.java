package org.aivan.savet7.security;

import java.io.IOException;

import org.aivan.savet7.model.BaseUser;
import org.aivan.savet7.privaterepository.UserJpaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.aivan.savet7.security.JsonParsingException;

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
    @ResponseBody
    public UserBean get() {

        UserBean user = new UserBean();

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth != null) {

            Object principal = auth.getPrincipal();

            if (principal instanceof UserDetails) {

                UserDetails userDetails = (UserDetails) principal;
                user.setUsername(userDetails.getUsername());

            }
        }

        return user;
    }

    @RequestMapping(value = "/admin/create", method = RequestMethod.POST, produces = JSON, consumes = JSON)
    @ResponseBody
    public BaseUser createUser(@RequestBody String json) throws JsonParsingException {

        BaseUser baseUser;
        ObjectMapper mapper = new ObjectMapper();
        try {
            baseUser = mapper.readValue(json, BaseUser.class);
        } catch (IOException e) {
            throw new JsonParsingException("Unable to parse JSON request data", e);
        }

        return userRepository.save(baseUser.toUser());

    }

}

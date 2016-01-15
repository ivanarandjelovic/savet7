package org.aivan.savet7.util;

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.Arrays;
import java.util.Enumeration;

import javax.servlet.http.HttpSession;

import org.aivan.savet7.model.User;
import org.aivan.savet7.privaterepository.UserJpaRepository;
import org.junit.Assert;
import org.junit.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.mock.http.MockHttpOutputMessage;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.junit.Assert.*;

/**
 * Holds basic security related setup for other tests.
 * 
 * @author aivan
 *
 */
public abstract class SecurityTest {

    private static final String adminRole = "ROLE_ADMIN";
    private static final String userRole = "ROLE_USER";
    protected MediaType contentTypeJson = new MediaType(MediaType.APPLICATION_JSON.getType(),
            MediaType.APPLICATION_JSON.getSubtype(), Charset.forName("utf8"));
    protected MediaType contentTypeForm = new MediaType(MediaType.APPLICATION_FORM_URLENCODED.getType(),
            MediaType.APPLICATION_FORM_URLENCODED.getSubtype(), Charset.forName("utf8"));
    protected MockMvc mockMvc;
    protected String userName = "user";
    protected String userPassword = "userPassword";
    protected String adminName = "admin";
    protected String adminPassword = "adminPassword";
    protected User user;
    protected User admin;
    @SuppressWarnings("rawtypes")
    protected HttpMessageConverter mappingJackson2HttpMessageConverter;
    @Autowired
    protected WebApplicationContext webApplicationContext;
    @Autowired
    protected UserJpaRepository userRepository;

    @Autowired
    protected void setConverters(HttpMessageConverter<?>[] converters) {

        this.mappingJackson2HttpMessageConverter = Arrays.asList(converters).stream()
                .filter(hmc -> hmc instanceof MappingJackson2HttpMessageConverter).findAny().get();

        Assert.assertNotNull("the JSON message converter must not be null", this.mappingJackson2HttpMessageConverter);
    }

    @Before
    public void setup() throws Exception {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).apply(springSecurity()).build();
        // webAppContextSetup(webApplicationContext).build();

        userRepository.deleteAllInBatch();

        User u = new User();
        u.setId(new Long(1));
        u.setUsername(userName);
        u.setPassword(userPassword);
        u.setRole(userRole);
        this.user = userRepository.save(u);

        User a = new User();
        a.setId(new Long(2));
        a.setUsername(adminName);
        a.setPassword(adminPassword);
        a.setRole(adminRole);
        this.admin = userRepository.save(a);

        assertEquals(admin.getRole(), adminRole);

    }

    @SuppressWarnings("unchecked")
    protected String json(Object o) throws IOException {
        MockHttpOutputMessage mockHttpOutputMessage = new MockHttpOutputMessage();
        this.mappingJackson2HttpMessageConverter.write(o, MediaType.APPLICATION_JSON, mockHttpOutputMessage);
        return mockHttpOutputMessage.getBodyAsString();
    }

    protected MockHttpSession loginWithUser() throws Exception {
        return createMockSession(mockMvc.perform(
                post("/login").contentType(contentTypeForm).param("username", userName).param("password", userPassword))
                .andExpect(status().isOk()).andReturn().getRequest().getSession());
    }

    protected MockHttpSession createMockSession(HttpSession session) {
        MockHttpSession mockSession = new MockHttpSession();
        Enumeration<String> sessAttrs = session.getAttributeNames();
        while (sessAttrs.hasMoreElements()) {
            String attrName = sessAttrs.nextElement();

            mockSession.setAttribute(attrName, session.getAttribute(attrName));
        }
        return mockSession;
    }

    protected MockHttpSession loginWithAdmin() throws Exception {

        return createMockSession(mockMvc.perform(post("/login").contentType(contentTypeForm)
                .param("username", adminName).param("password", adminPassword)).andExpect(status().isOk()).andReturn()
                .getRequest().getSession());
    }

}

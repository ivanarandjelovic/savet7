package org.aivan.savet7.util;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;
import static org.hamcrest.Matchers.nullValue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.aivan.savet7.Savet7Main;
import org.aivan.savet7.model.BaseUser;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(Savet7Main.class)
@WebAppConfiguration
// @IntegrationTest("server.port:0")
public class UserControllerTest extends SecurityTest {

    BaseUser newUser;

    @Override
    public void setup() throws Exception {
        // TODO Auto-generated method stub
        super.setup();

        newUser = new BaseUser();
        newUser.setUsername("newUser");
        newUser.setPassword("newUserPassword");
        newUser.setRole("ROLE_USER");
    }

    @Test
    public void loginUser() throws Exception {
        loginWithUser();
    }

    @Test
    public void loginAdmin() throws Exception {
        loginWithAdmin();
    }

    @Test
    public void loginWrongPassword() throws Exception {
        mockMvc.perform(post("/login").contentType(contentTypeForm).param("username", adminName).param("password",
                adminPassword + "xxx")).andExpect(status().isUnauthorized());
    }

    @Test
    public void loginWrongUsername() throws Exception {
        mockMvc.perform(post("/login").contentType(contentTypeForm).param("username", adminName + "xxx")
                .param("password", adminPassword)).andExpect(status().isUnauthorized());
    }

    @Test
    public void logout() throws Exception {
        MockHttpSession session = loginWithUser();
        mockMvc.perform(post("/logout").session(session).contentType(contentTypeForm)).andExpect(status().isOk());
    }

    @Test
    public void getUser() throws Exception {
        MockHttpSession session = loginWithUser();
        mockMvc.perform(get("/userService/get").session(session)).andExpect(jsonPath("$.username", notNullValue()));
    }

    @Test
    public void getUserNotLoggedIn() throws Exception {
        mockMvc.perform(get("/userService/get")).andExpect(jsonPath("$.username", nullValue()));
    }

    @Test
    public void adminCreateUser() throws Exception {
        MockHttpSession session = loginWithAdmin();
        mockMvc.perform(
                post("/userService/admin/create").session(session).content(json(newUser)).contentType(contentTypeJson))
                .andExpect(jsonPath("$.username", is(newUser.getUsername())));
    }

    @Test
    public void adminCreateUserAccessDenied() throws Exception {
        MockHttpSession session = loginWithUser();
        mockMvc.perform(post("/userService/admin/create").session(session).content(json(newUser)))
                .andExpect(status().isForbidden());
    }

    @Test
    public void adminCreateUserBadJson() throws Exception {
        MockHttpSession session = loginWithAdmin();
        mockMvc.perform(post("/userService/admin/create").session(session).content("{ bad :bad :bad}")
                .contentType(contentTypeJson)).andExpect(status().isInternalServerError());
    }

}
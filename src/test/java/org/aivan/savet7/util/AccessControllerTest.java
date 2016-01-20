package org.aivan.savet7.util;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.aivan.savet7.Savet7Main;
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
public class AccessControllerTest extends SecurityTest {

    @Override
    public void setup() throws Exception {
        super.setup();
    }

    @Test
    public void getBuildingsNotLoggedIn() throws Exception {
        mockMvc.perform(get("/api/buildings")).andExpect(status().isUnauthorized());
    }

    @Test
    public void getAddressesNotLoggedIn() throws Exception {
        mockMvc.perform(get("/api/addresses")).andExpect(status().isUnauthorized());
    }

    @Test
    public void getBuildingsUserLoggedIn() throws Exception {
        MockHttpSession session = loginWithUser();

        mockMvc.perform(get("/api/buildings").session(session)).andExpect(status().isOk());
    }

    @Test
    public void getAddressesUserLoggedIn() throws Exception {
        MockHttpSession session = loginWithUser();
        mockMvc.perform(get("/api/addresses").session(session)).andExpect(status().isOk());
    }

    @Test
    public void getBuildingsAdminLoggedIn() throws Exception {
        MockHttpSession session = loginWithAdmin();

        mockMvc.perform(get("/api/buildings").session(session)).andExpect(status().isOk());
    }

    @Test
    public void getAddressesAdminLoggedIn() throws Exception {
        MockHttpSession session = loginWithAdmin();
        mockMvc.perform(get("/api/addresses").session(session)).andExpect(status().isOk());
    }

}
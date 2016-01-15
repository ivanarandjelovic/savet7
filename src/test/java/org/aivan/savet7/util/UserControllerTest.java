package org.aivan.savet7.util;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
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
		mockMvc.perform(get("/userService/get").session(session)).andExpect(jsonPath("$..username", hasSize(1)));
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
		mockMvc.perform(
				post("/userService/admin/create").session(session).content("{ bad :bad :bad}").contentType(contentTypeJson))
				.andExpect(status().isInternalServerError());
	}

	/*
	 * @Test public void getAddresses() throws Exception {
	 * this.mockMvc.perform(get("/api/addresses")).andExpect(jsonPath(
	 * "$..street", hasSize(2))); }
	 * 
	 * @Test public void createBuilding() throws Exception { Building b1 = new
	 * Building(); b1.setId(new Long(3)); b1.setName("n3");
	 * 
	 * String buildingJson = json(b1);
	 * this.mockMvc.perform(post("/api/buildings").contentType(contentType).
	 * content(buildingJson)) .andExpect(status().isCreated()); }
	 * 
	 * @Test public void createBuildingWithAddress() throws Exception { Building
	 * b3 = new Building(); b3.setId(new Long(3)); b3.setName("n3");
	 * 
	 * Address a3 = new Address(); a3.setStreet("street3");
	 * 
	 * b3.setAddress(a3);
	 * 
	 * String buildingJson = json(b3);
	 * this.mockMvc.perform(post("/api/buildings").contentType(contentType).
	 * content(buildingJson)) .andExpect(status().isCreated());
	 * 
	 * }
	 * 
	 * @Test public void wrongMethod() throws Exception {
	 * 
	 * mockMvc.perform(get("/george/bookmarks/").content(this.json(new
	 * Building())).contentType(contentType)) .andExpect(status().isNotFound());
	 * }
	 */
	/*
	 * @Test public void userNotFound() throws Exception {
	 * mockMvc.perform(post("/george/bookmarks/") .content(this.json(new
	 * Bookmark())) .contentType(contentType))
	 * .andExpect(status().isNotFound()); }
	 */

	/*
	 * @Test public void readSingleBookmark() throws Exception {
	 * mockMvc.perform(get("/" + userName + "/bookmarks/" + this.bookmark
	 * List.get(0).getId())) .andExpect(status().isOk())
	 * .andExpect(content().contentType(contentType))
	 * .andExpect(jsonPath("$.id",
	 * is(this.bookmarkList.get(0).getId().intValue())))
	 * .andExpect(jsonPath("$.uri", is("http://bookmark.com/1/" + userName)))
	 * .andExpect(jsonPath("$.description", is("A description"))); }
	 * 
	 * @Test public void readBookmarks() throws Exception {
	 * mockMvc.perform(get("/" + userName + "/bookmarks"))
	 * .andExpect(status().isOk())
	 * .andExpect(content().contentType(contentType)) .andExpect(jsonPath("$",
	 * hasSize(2))) .andExpect(jsonPath("$[0].id",
	 * is(this.bookmarkList.get(0).getId().intValue())))
	 * .andExpect(jsonPath("$[0].uri", is("http://bookmark.com/1/" + userName)))
	 * .andExpect(jsonPath("$[0].description", is("A description")))
	 * .andExpect(jsonPath("$[1].id",
	 * is(this.bookmarkList.get(1).getId().intValue())))
	 * .andExpect(jsonPath("$[1].uri", is("http://bookmark.com/2/" + userName)))
	 * .andExpect(jsonPath("$[1].description", is("A description"))); }
	 * 
	 * @Test public void createBookmark() throws Exception { String bookmarkJson
	 * = json(new Bookmark( this.account, "http://spring.io",
	 * "a bookmark to the best resource for Spring news and information"));
	 * this.mockMvc.perform(post("/" + userName + "/bookmarks")
	 * .contentType(contentType) .content(bookmarkJson))
	 * .andExpect(status().isCreated()); }
	 */
}
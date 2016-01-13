package org.aivan.savet7.util;

import org.aivan.savet7.Savet7Main;
import org.aivan.savet7.config.JpaConfiguration;
import org.aivan.savet7.config.RepositoryConfig;
import org.aivan.savet7.config.WebConfiguration;
import org.aivan.savet7.model.Address;
import org.aivan.savet7.model.Building;
import org.aivan.savet7.model.User;
import org.aivan.savet7.privateRepository.UserJpaRepository;
import org.aivan.savet7.repository.AddressJpaRepository;
import org.aivan.savet7.repository.BuildingJpaRepository;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.WebIntegrationTest;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.mock.http.MockHttpOutputMessage;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.*;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(Savet7Main.class)
@WebAppConfiguration   
@IntegrationTest("server.port:0") 
public class UserControllerTest {

	private MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(),
			MediaType.APPLICATION_JSON.getSubtype(), Charset.forName("utf8"));

	private MediaType contentTypeForm = new MediaType(MediaType.APPLICATION_FORM_URLENCODED.getType(),
			MediaType.APPLICATION_FORM_URLENCODED.getSubtype(), Charset.forName("utf8"));

	private MockMvc mockMvc;

	private String userName = "user";
	private String userPassword = "user";

	private User user;

	private HttpMessageConverter mappingJackson2HttpMessageConverter;

	@Autowired
	private WebApplicationContext webApplicationContext;

	@Autowired
	private UserJpaRepository userRepository;

	@Autowired
	void setConverters(HttpMessageConverter<?>[] converters) {

		this.mappingJackson2HttpMessageConverter = Arrays.asList(converters).stream()
				.filter(hmc -> hmc instanceof MappingJackson2HttpMessageConverter).findAny().get();

		Assert.assertNotNull("the JSON message converter must not be null", this.mappingJackson2HttpMessageConverter);
	}

	@Before
	public void setup() throws Exception {
		this.mockMvc =  MockMvcBuilders
	            .webAppContextSetup(webApplicationContext)
	            .apply(springSecurity())
	            .build(); 
				//webAppContextSetup(webApplicationContext).build();

		userRepository.deleteAllInBatch();
		
		User u = new User();
		u.setId(new Long(1));
		u.setUsername(userName);
		u.setPassword(userPassword);
		u.setRole("ROLE_USER");
		this.user = userRepository.save(u);

	}

	@Test
	public void login() throws Exception {
		this.mockMvc.perform(post("/login").contentType(contentTypeForm).param("username",userName).param("password",  userPassword)).andExpect(status().is2xxSuccessful());
	}

/*	@Test
	public void getAddresses() throws Exception {
		this.mockMvc.perform(get("/api/addresses")).andExpect(jsonPath("$..street", hasSize(2)));
	}
	
	@Test
	public void createBuilding() throws Exception {
		Building b1 = new Building();
		b1.setId(new Long(3));
		b1.setName("n3");

		String buildingJson = json(b1);
		this.mockMvc.perform(post("/api/buildings").contentType(contentType).content(buildingJson))
				.andExpect(status().isCreated());
	}

	@Test
	public void createBuildingWithAddress() throws Exception {
		Building b3 = new Building();
		b3.setId(new Long(3));
		b3.setName("n3");
		
		Address a3 = new Address();
		a3.setStreet("street3");
		
		b3.setAddress(a3);

		String buildingJson = json(b3);
		this.mockMvc.perform(post("/api/buildings").contentType(contentType).content(buildingJson))
				.andExpect(status().isCreated());
		
	}
	
	@Test
	public void wrongMethod() throws Exception {

		mockMvc.perform(get("/george/bookmarks/").content(this.json(new Building())).contentType(contentType))
				.andExpect(status().isNotFound());
	}
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

	@SuppressWarnings("unchecked")
	protected String json(Object o) throws IOException {
		MockHttpOutputMessage mockHttpOutputMessage = new MockHttpOutputMessage();
		this.mappingJackson2HttpMessageConverter.write(o, MediaType.APPLICATION_JSON, mockHttpOutputMessage);
		return mockHttpOutputMessage.getBodyAsString();
	}
}
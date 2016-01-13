package org.aivan.savet7.util;

import org.aivan.savet7.Savet7Main;
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
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.mock.http.MockHttpOutputMessage;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.security.core.SpringSecurityCoreVersion;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
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

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Savet7Main.class)
@WebAppConfiguration
public class BuildingRestControllerTest {

	private MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(),
			MediaType.APPLICATION_JSON.getSubtype(), Charset.forName("utf8"));

	private MockMvc mockMvc;

	private String userName = "user";

	private User user;

	private HttpMessageConverter mappingJackson2HttpMessageConverter;

	private List<Building> buildingList = new ArrayList<>();
	private List<Address> addressList = new ArrayList<>();

	@Autowired
	private BuildingJpaRepository buildingRepository;

	@Autowired
	private WebApplicationContext webApplicationContext;

	@Autowired
	private UserJpaRepository userRepository;

	@Autowired
	private AddressJpaRepository addressRepository;

	@Autowired
	void setConverters(HttpMessageConverter<?>[] converters) {

		this.mappingJackson2HttpMessageConverter = Arrays.asList(converters).stream()
				.filter(hmc -> hmc instanceof MappingJackson2HttpMessageConverter).findAny().get();

		Assert.assertNotNull("the JSON message converter must not be null", this.mappingJackson2HttpMessageConverter);
	}

	@Before
	public void setup() throws Exception {
		this.mockMvc = webAppContextSetup(webApplicationContext).build();

		this.buildingRepository.deleteAllInBatch();
		this.addressRepository.deleteAllInBatch();

		User u = new User();
		u.setUsername(userName);
		u.setPassword("password");
		this.user = userRepository.save(u);

		Building b1 = new Building();
		b1.setId(new Long(1));
		b1.setName("n1");

		Building b2 = new Building();
		b2.setId(new Long(2));
		b2.setName("n2");

		this.buildingList.add(buildingRepository.save(b1));
		this.buildingList.add(buildingRepository.save(b2));

		Address a1 = new Address();
		a1.setId(new Long(1));
		a1.setState("Street1");
		a1.setNumber("n1");
		a1.setApartment("a1");
		a1.setPostalCode("pk1");
		a1.setCity("c1");
		a1.setState("s1");
		a1.setCountry("c1");
		
		Address a2 = new Address();
		a2.setId(new Long(2));
		a2.setState("Street2");
		a2.setNumber("n2");
		a2.setApartment("a2");
		a2.setPostalCode("pk2");
		a2.setCity("c2");
		a2.setState("s2");
		a2.setCountry("c2");

		this.addressList.add(addressRepository.save(a1));
		this.addressList.add(addressRepository.save(a2));
		
		
	}

	@Test
	public void getBuildings() throws Exception {
		this.mockMvc.perform(get("/api/buildings")).andExpect(jsonPath("$..name", hasSize(2)));
	}

	@Test
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
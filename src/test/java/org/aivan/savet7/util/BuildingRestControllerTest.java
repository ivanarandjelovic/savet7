package org.aivan.savet7.util;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.aivan.savet7.Savet7Main;
import org.aivan.savet7.model.Address;
import org.aivan.savet7.model.Building;
import org.aivan.savet7.repository.AddressJpaRepository;
import org.aivan.savet7.repository.BuildingJpaRepository;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Savet7Main.class)
@WebAppConfiguration
public class BuildingRestControllerTest extends SecurityTest {

    private List<Building> buildingList = new ArrayList<>();
    private List<Address> addressList = new ArrayList<>();

    @Autowired
    private BuildingJpaRepository buildingRepository;

    @Autowired
    private AddressJpaRepository addressRepository;

    @Before
    public void setup() throws Exception {
        super.setup();

        this.buildingRepository.deleteAllInBatch();
        this.addressRepository.deleteAllInBatch();

        Building b1 = new Building();
        b1.setId(new Long(1));
        b1.setName("n1");

        Building b2 = new Building();
        b2.setId(new Long(2));
        b2.setName("n2");

        Address a1 = new Address();
        a1.setId(new Long(1));
        a1.setStreet("Street1");
        a1.setState("State1");
        a1.setNumber("n1");
        a1.setApartment("a1");
        a1.setPostalCode("pk1");
        a1.setCity("c1");
        a1.setState("s1");
        a1.setCountry("c1");

        Address a2 = new Address();
        a2.setId(new Long(2));
        a2.setStreet("Street2");
        a2.setState("State2");
        a2.setNumber("n2");
        a2.setApartment("a2");
        a2.setPostalCode("pk2");
        a2.setCity("c2");
        a2.setState("s2");
        a2.setCountry("c2");

        this.addressList.add(addressRepository.save(a1));
        this.addressList.add(addressRepository.save(a2));

        b1.setAddress(this.addressList.get(0));
        b2.setAddress(this.addressList.get(1));

        this.buildingList.add(buildingRepository.save(b1));
        this.buildingList.add(buildingRepository.save(b2));

        List<Address> addrs = addressRepository.findAll();
        for (Address a : addrs) {
            System.out.println("a="+a);
        }
    }

    @Test
    public void getBuildings() throws Exception {
        MockHttpSession session = loginWithUser();
        mockMvc.perform(get("/api/buildings").session(session)).andExpect(jsonPath("$..name", hasSize(2)));
    }

    @Test
    public void getAddresses() throws Exception {
        MockHttpSession session = loginWithUser();
        mockMvc.perform(get("/api/addresses").session(session)).andExpect(jsonPath("$..street", hasSize(2)));
    }

    @Test
    public void createBuilding() throws Exception {

        MockHttpSession session = loginWithUser();

        Building b1 = new Building();
        b1.setId(new Long(3));
        b1.setName("Building test");

        String buildingJson = json(b1);
        mockMvc.perform(post("/api/buildings").session(session).contentType(contentTypeJson).content(buildingJson))
                .andExpect(status().isCreated());
    }

    /**
     * Adding "accept" header solved the problem of empty response but test
     * remains "as is" since it works.
     * 
     * @throws Exception
     */
    @Test
    @Transactional
    public void createBuildingWithAddress() throws Exception {
        MockHttpSession session = loginWithUser();

        Building b3 = new Building();
        b3.setName("Building test");

        Address a3 = new Address();
        a3.setStreet("street3");

        String addressJson = json(a3);
        mockMvc.perform(addCommonStuff(post("/api/addresses"), session).content(addressJson))
                .andExpect(status().isCreated()).andExpect(jsonPath("$.street", is(a3.getStreet())));

        String buildingJson = json(b3);
        mockMvc.perform(addCommonStuff(post("/api/buildings"), session).content(buildingJson))
                .andExpect(status().isCreated());

        Long b_id = null;
        List<Building> buildings = buildingRepository.findAll();
        for (Building b : buildings) {
            if ("Building test".equals(b.getName())) {
                b_id = b.getId();
                break;
            }
        }

        Long a_id = null;
        List<Address> addrs = addressRepository.findAll();
        for (Address addr : addrs) {
            if ("street3".equals(addr.getStreet())) {
                a_id = addr.getId();
                break;
            }
        }

        mockMvc.perform(
                put("/api/buildings/" + b_id + "/address").session(session).accept(MediaType.APPLICATION_JSON_UTF8)
                        .contentType(contentTypeUriList).content("http://localhost:8080/api/addresses/" + a_id))
                .andExpect(status().isNoContent());

        Building b = buildingRepository.getOne(b_id);
        Assert.assertEquals(b.getAddress().getId(), a_id);

    }

    @Test
    public void createBadAddress() throws Exception {
        MockHttpSession session = loginWithUser();

        Address a3 = new Address();
        a3.setStreet("shrt");

        String buildingJson = json(a3);
        mockMvc.perform(post("/api/addresses/").session(session).contentType(contentTypeJson).content(buildingJson))
                .andExpect(status().isBadRequest()).andExpect(jsonPath("$..validationErrors", hasSize(1)))
                .andExpect(jsonPath("$.validationErrors[0].fieldName", is("street")))
                .andExpect(jsonPath("$.validationErrors[0].errorCode", containsString("size")));
    }

    @Test
    public void createBuildingShortName() throws Exception {
        MockHttpSession session = loginWithUser();

        Building b3_short_name = new Building();
        b3_short_name.setId(new Long(3));
        b3_short_name.setName("bad");

        String buildingJson = json(b3_short_name);
        mockMvc.perform(post("/api/buildings").session(session).contentType(contentTypeJson).content(buildingJson))
                .andExpect(status().isBadRequest()).andExpect(jsonPath("$..validationErrors", hasSize(1)))
                .andExpect(jsonPath("$.validationErrors[0].fieldName", is("name")))
                .andExpect(jsonPath("$.validationErrors[0].errorCode", is("name.short")));
    }

    @Test
    public void createBuildingNoName() throws Exception {
        MockHttpSession session = loginWithUser();

        Building b3_short_name = new Building();
        b3_short_name.setId(new Long(3));
        b3_short_name.setName(null);

        String buildingJson = json(b3_short_name);
        mockMvc.perform(post("/api/buildings").session(session).contentType(contentTypeJson).content(buildingJson))
                .andExpect(status().isBadRequest()).andExpect(jsonPath("$..validationErrors", hasSize(1)))
                .andExpect(jsonPath("$.validationErrors[0].fieldName", is("name")))
                .andExpect(jsonPath("$.validationErrors[0].errorCode", is("name.short")));
    }

    @Test
    public void wrongMethod() throws Exception {

        MockHttpSession session = loginWithUser();

        mockMvc.perform(get("/george/bookmarks/").session(session).content(this.json(new Building()))
                .contentType(contentTypeJson)).andExpect(status().isNotFound());
    }

}

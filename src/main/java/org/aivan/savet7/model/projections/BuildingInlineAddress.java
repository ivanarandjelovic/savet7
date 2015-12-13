package org.aivan.savet7.model.projections;

import org.aivan.savet7.model.Address;
import org.aivan.savet7.model.Building;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "inlineAddress", types = { Building.class })
public interface BuildingInlineAddress {

	Long getId();

	String getName();

	Address getAddress();
}

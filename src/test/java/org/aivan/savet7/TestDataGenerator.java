package org.aivan.savet7;

public class TestDataGenerator {
	private static final int TEST_DATA_COUNT = 177;

	public static void main(String[] args) {
		for (int i = 1; i <= TEST_DATA_COUNT; i++) {
			System.out.println(
					"insert into address (id,street, number,apartment, postalCode, city, state, country) values (" + i + ",'Kapetana Miloša Žunjića','35A','" + i + "','11160','Beograd','','Srbija');");
			System.out.println("insert into building (name, address_id) values ('Test building " + i + "'," + i + ");");
		}
	}
}

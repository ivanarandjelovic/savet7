create table address (
	id IDENTITY primary key,
	street VARCHAR(200),
	number VARCHAR(20),
	apartment VARCHAR(20),
	postalCode VARCHAR(20),
	city VARCHAR(200),
	state VARCHAR(200),
	country VARCHAR(200)
);

create table building (
	id IDENTITY primary key,
	name VARCHAR(200),
	address_id BIGINT references address(id)
);



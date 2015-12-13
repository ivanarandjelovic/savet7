insert into address (id,street, number,apartment, postalCode, city, state, country)
values (1,'Kapetana Miloša Žunjića','35A','','11160','Beograd','','Srbija');

insert into building (name, address_id) values ('Test building 1',1);
insert into building (name, address_id) values ('Test building 2',1);
insert into building (name, address_id) values ('Test building 3',1);
insert into building (name, address_id) values ('Test building 4',null);
insert into building (name, address_id) values ('Test building 5',null);
create extension if not exists "uuid-ossp";

DROP TABLE IF EXISTS stocks;
DROP TABLE IF EXISTS products;

create table products(
	id uuid not null default uuid_generate_v4() primary key,
	title text not null,
	description text,
	price integer
);

create table stocks(
	product_id uuid not null,
	count integer,
	foreign key (product_id) references products(id)
);

insert into products (title, description, price) values ('iPhone12', 'iPhone product', 5000);
insert into products (title, description, price) values ('iPhone12 Pro', 'iPhone product', 15000);
insert into products (title, description, price) values ('iPhone11 Pro', 'iPhone product', 10000);
insert into products (title, description, price) values ('iPhone11', 'iPhone product', 18000);

insert into stocks (product_id, count) values ('ae738cd5-e3a2-4aa7-b3de-dfdadf377f46', 4);
insert into stocks (product_id, count) values ('84be2f87-0218-4d7b-b9d8-361554443284', 2);
insert into stocks (product_id, count) values ('76d82cf8-feee-4522-9ff5-d4ff2f347971', 5);
insert into stocks (product_id, count) values ('2bf43e81-7d8e-4e51-8105-895dcaf6ffe7', 8);

select * from products;

SELECT * FROM products as p inner join stocks as s on p.id = s.product_id;
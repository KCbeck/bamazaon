CREATE DATABASE bamazon_db
USE bamazon_db;

CREATE TABLE products (
item_id VARCHAR(30) NOT NULL,
product_name VARCHAR(30) NOT NULL,
department_name VARCHAR(255) NOT NULL,
cost DECIMAL(19 , 4 ) NOT NULL,
remaining_stock INTEGER(20) NOT NULL
);

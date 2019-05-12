DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT AUTO_INCREMENT
, product_name VARCHAR(100)
, department_name VARCHAR(100)
, price FLOAT(6, 2)
, stock_quantity INT(250)
, PRIMARY KEY (id)
);

DROP TABLE products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
('Graphics Card', 'Electronics', 599.99, 50)
, ('Picture Frame', 'Housewares', 29.99, 100)
, ('Cocktail Shaker', 'Housewares', 10.99, 104)
, ('USB Thumb Drive', 'Electronics', 5.99, 35)
, ('Turntable', 'Electronics', 100.00, 250)
, ('Patio Chair', 'Lawn and Garden', 19.99, 89)
, ('Cologne', 'Beauty', 49.99, 250)
, ('Pine Air Freshener', 'Automotive', 1.99, 199)
, ('Litter Box', 'Pets', 29.99, 50)
, ('Sprinkler', 'Lawn and Garden', 15.00, 175);

SELECT * FROM products;
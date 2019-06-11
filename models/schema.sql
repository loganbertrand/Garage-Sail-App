DROP DATABASE IF EXISTS exampledb;
CREATE DATABASE exampledb;

DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root'
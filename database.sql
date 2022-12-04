CREATE TABLE admin (
	id serial PRIMARY KEY,
	username VARCHAR ( 200 ) UNIQUE NOT NULL,
	password VARCHAR ( 200 ) NOT NULL,
	status INT NOT NULL,
	created_at TIMESTAMP,
  updated_at TIMESTAMP 
);

CREATE TABLE category (
	id serial PRIMARY KEY,
	name VARCHAR ( 200 ) UNIQUE NOT NULL,
	status INT NOT NULL,
	created_at TIMESTAMP,
  updated_at TIMESTAMP 
);
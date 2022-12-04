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

CREATE TABLE question (
  id serial PRIMARY KEY,
  admin_id INT NOT NULL,
  category_id INT NOT NULL,
  content VARCHAR ( 900 ),
  status INT NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (admin_id)
    REFERENCES admin (id),
  FOREIGN KEY (category_id)
    REFERENCES category (id)
);

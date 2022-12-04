CREATE TABLE admin (
	id serial PRIMARY KEY,
	username VARCHAR (255) UNIQUE NOT NULL,
	password VARCHAR (255) NOT NULL,
	status INT NOT NULL,
	created_at TIMESTAMP,
  updated_at TIMESTAMP 
);

CREATE TABLE category (
	id serial PRIMARY KEY,
	name VARCHAR (255) UNIQUE NOT NULL,
	status INT NOT NULL,
	created_at TIMESTAMP,
  updated_at TIMESTAMP 
);

CREATE TABLE question (
  id serial PRIMARY KEY,
  category_id INT NOT NULL,
  content VARCHAR (255),
  status INT NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (admin_id) REFERENCES admin (id),
  FOREIGN KEY (category_id) REFERENCES category (id)
);

COPY question(id, admin_id, category_id, content, status, created_at, updated_at)
FROM 'C:\Users\cipto\Desktop\question.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE answer (
  id serial PRIMARY KEY,
  question_id INT NOT NULL,
  content VARCHAR (255),
  score INT NOT NULL,
  status INT NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (question_id) REFERENCES question (id)
);

CREATE TABLE test_session (
  id serial PRIMARY KEY,
  category_id INT NOT NULL,
  description VARCHAR (255),
  pre_test_msg VARCHAR (255),
  time_limit INT NOT NULL,
  status INT NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES category (id)
);

CREATE TABLE partisipant (
  id serial PRIMARY KEY,
  category_id INT NOT NULL,
  test_session_id INT NOT NULL,
  nik VARCHAR (50),
  name VARCHAR (255),
  partisipant_numb VARCHAR (50),
  score INT NOT NULL,
  status INT NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES category (id),
  FOREIGN KEY (test_session_id) REFERENCES test_session (id)
);

CREATE TABLE test_result (
  id serial PRIMARY KEY,
  partisipant_id INT NOT NULL,
  answer_id INT NOT NULL,
  status INT NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (partisipant_id) REFERENCES partisipant (id),
  FOREIGN KEY (answer_id) REFERENCES answer (id)
);
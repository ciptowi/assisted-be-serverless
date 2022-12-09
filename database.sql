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
  content VARCHAR (MAX),
  status INT NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES category (id)
);

CREATE TABLE answer (
  id serial PRIMARY KEY,
  question_id INT NOT NULL,
  content VARCHAR (MAX),
  score INT NOT NULL,
  status INT NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (question_id) REFERENCES question (id)
);

CREATE TABLE test_session (
  id serial PRIMARY KEY,
  category_id VARCHAR (255),
  description VARCHAR (MAX),
  pre_test_msg VARCHAR (MAX),
  time_limit INT NOT NULL,
  status INT NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
);

CREATE TABLE participant (
  id serial PRIMARY KEY,
  category_id INT NOT NULL,
  test_session_id INT NOT NULL,
  nik VARCHAR (255),
  name VARCHAR (255),
  participant_numb VARCHAR (255),
  score INT NOT NULL,
  status INT NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES category (id),
  FOREIGN KEY (test_session_id) REFERENCES test_session (id)
);

CREATE TABLE test_result (
  id serial PRIMARY KEY,
  participant_id INT NOT NULL,
  answer_id INT NOT NULL,
  status INT NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (participant_id) REFERENCES participant (id),
  FOREIGN KEY (answer_id) REFERENCES answer (id)
);

COPY question(id, admin_id, category_id, content, status, created_at, updated_at)
FROM 'C:\Users\cipto\Desktop\question.csv' DELIMITER ',' CSV HEADER;
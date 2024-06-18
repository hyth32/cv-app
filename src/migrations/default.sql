CREATE TABLE salary (
    id SERIAL PRIMARY KEY,
    owner_id INTEGER REFERENCES users(id),
    salary_from NUMERIC,
    salary_to NUMERIC
);

CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,
    owner_id INTEGER REFERENCES users(id),
    email VARCHAR(255),
    phone VARCHAR(20),
    links VARCHAR(255)[]
);

CREATE TABLE companies (
    id SERIAL PRIMARY KEY,
    owner_id INTEGER REFERENCES users(id),
    name VARCHAR(255),
    location VARCHAR(255),
    employer_count INTEGER
);

CREATE TABLE vacancies (
    id SERIAL PRIMARY KEY,
    owner_id INTEGER REFERENCES users(id),
    contact INTEGER REFERENCES contacts(id),
    salary INTEGER REFERENCES salary(id),
    name VARCHAR(255),
    location VARCHAR(255),
    company_id INTEGER REFERENCES companies(id)
);

CREATE TABLE resumes (
    id SERIAL PRIMARY KEY,
    owner_id INTEGER REFERENCES users(id),
    contact INTEGER REFERENCES contacts(id),
    salary INTEGER REFERENCES salary(id),
    name VARCHAR(255),
    stack VARCHAR(255)[]
);
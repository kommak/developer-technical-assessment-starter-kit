
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image_urls TEXT[] NOT NULL, 
    price_range VARCHAR(50),   
    city VARCHAR(100),
    neighborhood VARCHAR(100),
    details TEXT,
    view_count NUMERIC,
    sq_ft_or_area NUMERIC
);

CREATE INDEX idx_projects_location ON projects (city, neighborhood);

CREATE INDEX idx_projects_price ON projects (price_range);

ALTER TABLE projects
ADD COLUMN search_vector tsvector;

UPDATE projects
SET search_vector = 
    to_tsvector('english', coalesce(name,'') || ' ' || coalesce(details,''));

CREATE INDEX idx_projects_search ON projects USING GIN(search_vector);

CREATE FUNCTION projects_search_vector_update() RETURNS trigger AS $$
BEGIN
  NEW.search_vector :=
    to_tsvector('english', coalesce(NEW.name,'') || ' ' || coalesce(NEW.details,''));
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_projects_search_vector
BEFORE INSERT OR UPDATE ON projects
FOR EACH ROW EXECUTE FUNCTION projects_search_vector_update();

CREATE TABLE properties (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image_urls TEXT[] NOT NULL,
    price NUMERIC,
    city VARCHAR(100),
    neighborhood VARCHAR(100),
    details TEXT,
    view_count NUMERIC,
    sq_ft_or_area NUMERIC
);
CREATE INDEX idx_properties_location ON properties (city, neighborhood);
CREATE INDEX idx_properties_price ON properties (price)

ALTER TABLE properties
ADD COLUMN search_vector tsvector;

UPDATE properties
SET search_vector = 
    to_tsvector('english', coalesce(name,'') || ' ' || coalesce(details,''));

CREATE INDEX idx_properties_search ON properties USING GIN(search_vector);

CREATE FUNCTION properties_search_vector_update() RETURNS trigger AS $$
BEGIN
  NEW.search_vector :=
    to_tsvector('english', coalesce(NEW.name,'') || ' ' || coalesce(NEW.details,''));
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_properties_search_vector
BEFORE INSERT OR UPDATE ON properties
FOR EACH ROW EXECUTE FUNCTION properties_search_vector_update();




CREATE TABLE lands (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image_urls TEXT[] NOT NULL,
    price NUMERIC,
    city VARCHAR(100),
    neighborhood VARCHAR(100),
    details TEXT,
    view_count NUMERIC,
    sq_ft_or_area NUMERIC
);

CREATE INDEX idx_lands_location ON lands (city, neighborhood);
CREATE INDEX idx_lands_price ON lands (price);

ALTER TABLE lands
ADD COLUMN search_vector tsvector;

UPDATE lands
SET search_vector = 
    to_tsvector('english', coalesce(name,'') || ' ' || coalesce(details,''));

CREATE INDEX idx_lands_search ON lands USING GIN(search_vector);

CREATE FUNCTION landss_search_vector_update() RETURNS trigger AS $$
BEGIN
  NEW.search_vector :=
    to_tsvector('english', coalesce(NEW.name,'') || ' ' || coalesce(NEW.details,''));
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_lands_search_vector
BEFORE INSERT OR UPDATE ON lands
FOR EACH ROW EXECUTE FUNCTION lands_search_vector_update();




CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);


CREATE TABLE agent_contacts (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    target_type VARCHAR(50) NOT NULL,
    target_id INT NOT NULL,
    contact_date TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_agent_contacts_user ON agent_contacts(user_id);


ALTER TABLE properties
ADD COLUMN bedrooms INT;

ALTER TABLE properties
ADD COLUMN bathrooms INT;

ALTER TABLE properties
ADD COLUMN amenities TEXT[];


ALTER TABLE projects
ADD COLUMN amenities TEXT[];

ALTER TABLE lands
ADD COLUMN amenities TEXT[];
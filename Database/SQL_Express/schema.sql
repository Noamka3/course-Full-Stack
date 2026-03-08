DROP TABLE IF EXISTS pokemon_trainer;
DROP TABLE IF EXISTS pokemon;
DROP TABLE IF EXISTS trainer;
DROP TABLE IF EXISTS town;
DROP TABLE IF EXISTS pokemon_type;

CREATE TABLE pokemon_type (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE town (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) UNIQUE NOT NULL
);

CREATE TABLE trainer (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    town_id INT NOT NULL REFERENCES town(id),
    UNIQUE (name, town_id)
);

CREATE TABLE pokemon (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    height INT NOT NULL,
    weight INT NOT NULL,
    type_id INT NOT NULL REFERENCES pokemon_type(id)
);

CREATE TABLE pokemon_trainer (
    pokemon_id INT NOT NULL REFERENCES pokemon(id),
    trainer_id INT NOT NULL REFERENCES trainer(id),
    PRIMARY KEY (pokemon_id, trainer_id)
);
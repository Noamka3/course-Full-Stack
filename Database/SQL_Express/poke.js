const fs = require("fs");
const { Sequelize, QueryTypes } = require("sequelize");

const sequelize = new Sequelize("sql_intro", "postgres", "Noam1234", {
  host: "localhost",
  dialect: "postgres",
  port: 5432,
  logging: false,
});

async function getOrCreateType(typeName) {
  await sequelize.query(
    `
    INSERT INTO pokemon_type (name)
    VALUES (:typeName)
    ON CONFLICT (name) DO NOTHING
    `,
    {
      replacements: { typeName },
    }
  );

  const result = await sequelize.query(
    `
    SELECT id
    FROM pokemon_type
    WHERE name = :typeName
    `,
    {
      replacements: { typeName },
      type: QueryTypes.SELECT,
    }
  );

  return result[0].id;
}

async function getOrCreateTown(townName) {
  await sequelize.query(
    `
    INSERT INTO town (name)
    VALUES (:townName)
    ON CONFLICT (name) DO NOTHING
    `,
    {
      replacements: { townName },
    }
  );

  const result = await sequelize.query(
    `
    SELECT id
    FROM town
    WHERE name = :townName
    `,
    {
      replacements: { townName },
      type: QueryTypes.SELECT,
    }
  );

  return result[0].id;
}

async function getOrCreateTrainer(trainerName, townId) {
  await sequelize.query(
    `
    INSERT INTO trainer (name, town_id)
    VALUES (:trainerName, :townId)
    ON CONFLICT (name, town_id) DO NOTHING
    `,
    {
      replacements: { trainerName, townId },
    }
  );

  const result = await sequelize.query(
    `
    SELECT id
    FROM trainer
    WHERE name = :trainerName AND town_id = :townId
    `,
    {
      replacements: { trainerName, townId },
      type: QueryTypes.SELECT,
    }
  );

  return result[0].id;
}

async function insertPokemon(pokemon, typeId) {
  await sequelize.query(
    `
    INSERT INTO pokemon (id, name, height, weight, type_id)
    VALUES (:id, :name, :height, :weight, :typeId)
    ON CONFLICT (id) DO NOTHING
    `,
    {
      replacements: {
        id: pokemon.id,
        name: pokemon.name,
        height: pokemon.height,
        weight: pokemon.weight,
        typeId,
      },
    }
  );
}

async function insertPokemonTrainer(pokemonId, trainerId) {
  await sequelize.query(
    `
    INSERT INTO pokemon_trainer (pokemon_id, trainer_id)
    VALUES (:pokemonId, :trainerId)
    ON CONFLICT (pokemon_id, trainer_id) DO NOTHING
    `,
    {
      replacements: { pokemonId, trainerId },
    }
  );
}

async function insertAllData(pokemons) {
  for (const pokemon of pokemons) {
    const typeId = await getOrCreateType(pokemon.type);
    await insertPokemon(pokemon, typeId);

    for (const owner of pokemon.ownedBy) {
      const townId = await getOrCreateTown(owner.town);
      const trainerId = await getOrCreateTrainer(owner.name, townId);
      await insertPokemonTrainer(pokemon.id, trainerId);
    }
  }
}

async function getHeaviestPokemon() {
  const result = await sequelize.query(
    `
    SELECT *
    FROM pokemon
    WHERE weight = (SELECT MAX(weight) FROM pokemon)
    `,
    {
      type: QueryTypes.SELECT,
    }
  );

  return result;
}

async function findByType(typeName) {
  const result = await sequelize.query(
    `
    SELECT p.name
    FROM pokemon p
    JOIN pokemon_type pt ON p.type_id = pt.id
    WHERE pt.name = :typeName
    ORDER BY p.id
    `,
    {
      replacements: { typeName },
      type: QueryTypes.SELECT,
    }
  );

  return result.map((pokemon) => pokemon.name);
}

async function findOwners(pokemonName) {
  const result = await sequelize.query(
    `
    SELECT t.name
    FROM pokemon p
    JOIN pokemon_trainer pt ON p.id = pt.pokemon_id
    JOIN trainer t ON pt.trainer_id = t.id
    WHERE p.name = :pokemonName
    ORDER BY t.name
    `,
    {
      replacements: { pokemonName },
      type: QueryTypes.SELECT,
    }
  );

  return result.map((owner) => owner.name);
}
async function findRoster(trainerName){
  const result = await sequelize.query(
    `
    SELECT p.name
    FROM trainer t
    JOIN pokemon_trainer pt ON t.id = pt.trainer_id
    JOIN pokemon p ON pt.pokemon_id = p.id
    WHERE t.name = :trainerName
    ORDER BY p.id
    `,
    {
      replacements: { trainerName },
      type: QueryTypes.SELECT,
    }
  );
   return result.map((pokemon) => pokemon.name);
}

async function run() {
  try {
    await sequelize.authenticate();
    console.log("Connected successfully.");

    const rawData = fs.readFileSync("./poke_data.json", "utf-8");
    const pokemons = JSON.parse(rawData);

    console.log("Total Pokemon:", pokemons.length);
    console.log("First Pokemon:", pokemons[0]);

    // INSERT ALL DATA IN DATABASE
    await insertAllData(pokemons);
    console.log("All data inserted successfully.");

    const heaviestPokemon = await getHeaviestPokemon();
    console.log("Heaviest Pokemon:", heaviestPokemon);

    const grassPokemons = await findByType("grass");
    console.log("Grass Pokemon:", grassPokemons);

    const owners = await findOwners("gengar");
    console.log("Owners of gengar:", owners);

    const roster = await findRoster("Loga");
    console.log("Roster of Loga:", roster);

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await sequelize.close();
  }
}

run();
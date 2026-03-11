'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
up: async (queryInterface, Sequelize) => {
  await queryInterface.createSchema("recipes").catch(() => {});
    await queryInterface.createTable({ schema: "recipes", tableName: "Recipes" }, {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      ingredients: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      instructions: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      cookingTime: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      servings: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      difficulty: {
        type: Sequelize.ENUM("easy", "medium", "hard"),
        allowNull: false,
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      isPublic: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down:   async (queryInterface) => {
    await queryInterface.dropTable("Recipes");
  },
};

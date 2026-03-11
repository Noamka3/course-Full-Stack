
const sequelize = require("./db");

const User = require("./User")(sequelize);
const Recipe = require("./Recipe")(sequelize);
const UserFavorite = require("./UserFavorite")(sequelize);

// הגדרת קשרים
User.hasMany(Recipe, { foreignKey: "userId", onDelete: "CASCADE" });
Recipe.belongsTo(User, { foreignKey: "userId" });

User.belongsToMany(Recipe, {
  through: UserFavorite,
  foreignKey: "userId",
  as: "favorites",
});
Recipe.belongsToMany(User, {
  through: UserFavorite,
  foreignKey: "recipeId",
  as: "favoritedBy",
});

module.exports = { sequelize, User, Recipe, UserFavorite };
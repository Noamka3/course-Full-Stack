const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const UserFavorite = sequelize.define("UserFavorite", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    recipeId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  }, {
    tableName: "UserFavorites",
    timestamps: true,
  });

  return UserFavorite;
};



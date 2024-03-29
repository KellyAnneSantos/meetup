"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Membership extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Membership.belongsTo(models.User, {
        as: "Membership",
        foreignKey: "userId",
      });
      Membership.belongsTo(models.Group, { foreignKey: "groupId" });
    }
  }
  Membership.init(
    {
      status: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: [0, 30],
        },
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      groupId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Membership",
    }
  );
  return Membership;
};

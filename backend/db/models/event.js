"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Event.belongsToMany(models.User, { through: models.Attendance });
      Event.belongsTo(models.Group, { as: "Group", foreignKey: "groupId" });
      Event.belongsTo(models.Venue, { as: "Venue", foreignKey: "venueId" });
      Event.hasMany(models.Image, { as: "images", foreignKey: "eventId" });
      Event.hasMany(models.Attendance, { foreignKey: "eventId" });
    }
  }
  Event.init(
    {
      groupId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      venueId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: [5, 256],
        },
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: [1, 256],
        },
      },
      type: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: [1, 30],
        },
      },
      capacity: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      price: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      startDate: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      endDate: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Event",
    }
  );
  return Event;
};

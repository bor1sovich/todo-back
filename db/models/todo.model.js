const { Sequelize, DataTypes} = require("sequelize");
const { sequelize } = require("..");

class todo extends Sequelize.Model {}

todo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      // defaultValue: 'title',
    },
    description: {
      type: DataTypes.STRING,
      // defaultValue: 'description',
    },
    isDone: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: "todo",
  }
);

module.exports = todo;

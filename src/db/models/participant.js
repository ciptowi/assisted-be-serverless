'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class participant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  participant.init({
    test_session_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    nik: DataTypes.STRING,
    name: DataTypes.STRING,
    participant_numb: DataTypes.STRING,
    score: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'participant',
  });
  return participant;
};
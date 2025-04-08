'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
   
    static associate(models) {
      Usuario.hasMany(models.Conta, { foreignKey: 'usuarioId' });
    }
    
  }
  Usuario.init({
    nome: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Conta extends Model {

    static associate(models) {
      Conta.belongsTo(models.Usuario, { foreignKey: 'usuarioId' });
      Conta.belongsTo(models.Instituicao, { foreignKey: 'instituicaoId ' });
      Conta.hasMany(models.Transacao, { foreignKey: 'contaId' });
    }

  }
  Conta.init({
    saldo: DataTypes.FLOAT,
    usuarioId: DataTypes.INTEGER,
    instituicaoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Conta',
  });
  return Conta;
};
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Conta extends Model {

    static associate(models) {
      Conta.belongsTo(models.Usuario, { foreignKey: 'usuarioCpf' });
      Conta.belongsTo(models.Instituicao, { foreignKey: 'instituicaoId ' });
      Conta.hasMany(models.Transacao, { foreignKey: 'contaId' });
    }

  }
  Conta.init({
    saldo: DataTypes.FLOAT,
    usuarioCpf: {
      type: DataTypes.STRING,
      references: {
        model: 'Usuarios',
        key: 'cpf'
      }
    },
    instituicaoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Conta',
  });
  return Conta;
};
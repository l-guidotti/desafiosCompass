'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Usuarios', 'id');

    await queryInterface.addColumn('Usuarios', 'cpf', {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    });

    await queryInterface.addColumn('Conta', 'usuarioCpf', {
      type: Sequelize.STRING,
      references: {
        model: 'Usuarios',
        key: 'cpf',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    await queryInterface.removeColumn('Conta', 'usuarioId');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('Usuarios', 'id', {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    });

    await queryInterface.removeColumn('Usuarios', 'cpf');

    await queryInterface.removeColumn('Conta', 'usuarioCpf');

    await queryInterface.addColumn('Conta', 'usuarioId', {
      type: Sequelize.INTEGER,
    });
  }
};

"use strict";

//  @type {import('sequelize-cli').Migration}
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add altering commands here

    await queryInterface.createTable("Assets", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      device: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      serialnumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      assignee: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      companyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Companies",
          key: "id",
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    //  Add reverting commands here.

    await queryInterface.dropTable("Assets");
  },
};

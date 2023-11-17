"use strict";

//  @type {import('sequelize-cli').Migration}
module.exports = {
  async up(queryInterface, Sequelize) {
    //  Add altering commands here.

    await queryInterface.createTable("Companies", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    // Add reverting commands here.

    await queryInterface.dropTable("Companies");
  },
};

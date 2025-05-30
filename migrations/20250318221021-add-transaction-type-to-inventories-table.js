"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn("Inventories", "transaction_type", { type: Sequelize.ENUM("in", "out", "adjustment") });
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn("Inventories", "transaction_type");
	},
};

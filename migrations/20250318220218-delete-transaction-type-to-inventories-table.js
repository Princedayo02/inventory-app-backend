"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.removeColumn("Inventories", "transaction_type");
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.addColumn("Inventories", "transaction_type", { type: Sequelize.STRING });
	},
};

"use strict";
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const users = [];
		console.log("users created");
		for (let i = 0; i < 21; i++) {
			users.push({
				user_id: uuidv4(),
				email: faker.internet.email(),
				password: await bcrypt.hash("123", 5),
				fullName: faker.person.fullName({ firstName: faker.internet.username(), lastName: faker.internet.username() }),
				gender: faker.person.sex(),
				status: "active",
				role: "user",
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		}
		const admin = {
			user_id: uuidv4(),
			email: "admin@host.com",
			password: await bcrypt.hash("123", 10),
			gender: "M",
			fullName: faker.person.fullName({ firstName: faker.internet.username(), lastName: faker.internet.username() }),
			status: "active",
			role: "admin",
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		await queryInterface.bulkInsert("Users", [admin, ...users], {});
		return [admin, ...users];
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Users", null, {});
	},
};

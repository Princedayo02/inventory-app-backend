require("dotenv").config();

module.exports = {
	development: {
		username: process.env.DB_USERNAME || "",
		password: process.env.DB_PASSWORD || "",
		database: process.env.DB_DATABASE || "",
		host: process.env.DB_HOST || "",
		port: process.env.DB_PORT || 5432,
		dialect: "postgres",
		logging: false,
	},
	test: {
		username: process.env.TEST_DB_USERNAME || "",
		password: process.env.TEST_DB_PASSWORD || "",
		database: process.env.TEST_DB_DATABASE_TEST || "",
		host: process.env.TEST_DB_HOST || "",
		port: process.env.TEST_DB_PORT || 5432,
		dialect: "postgres",
		logging: false,
	},
	production: {
		username: process.env.DB_USERNAME || "",
		password: process.env.DB_PASSWORD || "",
		database: process.env.DB_DATABASE || "",
		host: process.env.DB_HOST || "",
		port: process.env.DB_PORT || 5432,
		dialect: "postgres",
		logging: false,
	},
};

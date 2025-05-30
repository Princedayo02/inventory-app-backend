import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { join } from "path";

dotenv.config();

const port = Number(process.env.DB_PORT);

const sequelize = new Sequelize({
	dialect: "postgres",
	port: port,
	host: process.env.DB_HOST || "",
	username: process.env.DB_USERNAME || "",
	password: process.env.DB_PASSWORD || "",
	database: process.env.DB_DATABASE || "",
	models: [join(__dirname, "models")],
	logging: false,
	dialectOptions: { ssl: { required: true } },
});

export default sequelize;

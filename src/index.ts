import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import CORS from "cors";
import sequelize from "./database/connection";
import router from "./routes";

dotenv.config();
sequelize
	.sync({ alter: true })
	.then(() => console.log("db connected successfully"))
	.catch((error) => console.log("error connecting database", error));

const app = express();
const port = process.env.PORT || 4000;

app.use(CORS());
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
	res.status(200).json({ message: "App running perfectly" });
});
app.use("/api", router);

app.listen(port, () => {
	console.log(`App running perfectly on port ${port} `);
});

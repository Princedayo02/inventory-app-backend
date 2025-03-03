import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import Users from "../database/models/users";

dotenv.config();

export const authToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const header = req.headers.authorization;
	const secret = process.env.SECRET || "";

	try {
		const token = header && header.split(" ")[1];
		if (!token) {
			res.status(401).json({ message: "access token not provided" });
		} else {
			const decoded = jwt.verify(token, secret);
			console.log(decoded, "decoded token from authMiddleware");
			res.locals.user = decoded;
			next();
		}
	} catch (error) {
		res.status(500).json({ message: "failed to verify token", error });
	}
};

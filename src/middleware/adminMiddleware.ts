import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
dotenv.config();

const adminAccess = (req: Request, res: Response, next: NextFunction) => {
	const header = req.headers.authorization;
	const secretKey = process.env.SECRET || "";
	try {
		const token = header && header.split(" ")[1];
		if (!token) {
			res.status(401).json({ message: "access token required" });
		} else {
			const decoded = jwt.verify(token, secretKey);
			const isAdmin = decoded.role;
			if (isAdmin) {
				res.status(200).json({ message: "admin portal accessed" });
			}
			res.locals.admin = decoded;
			next();
		}
	} catch (error) {
		res.status(500).json({ mesage: "token not verified" });
	}
};

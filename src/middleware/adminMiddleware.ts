import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
dotenv.config();

// const adminAccess = (req: Request, res: Response, next: NextFunction) => {
// 	const header = req.headers.authorization;
// 	const secretKey = process.env.SECRET || "";
// 	try {
// 		const token = header && header.split(" ")[1];
// 		if (!token) {
// 			res.status(401).json({ message: "access token required" });
// 		} else {
// 			const decoded = jwt.verify(token, secretKey);
// 			const isAdmin = decoded.role;
//       res.locals.admin = decoded;
// 			if (isAdmin) {
// 				res.status(200).json({ message: "admin portal accessed" });
// 			}
// 			next();
// 		}
// 	} catch (error) {
// 		res.status(500).json({ mesage: "token not verified" });
// 	}
// };

export const checkAdminRole = (req: Request, res: Response, next: NextFunction) => {
	const role = res.locals.user.role;
	if (role === "admin") {
		next();
	} else {
		res.status(403).json({ message: "Forbidden!!! No access!!!" });
	}
};

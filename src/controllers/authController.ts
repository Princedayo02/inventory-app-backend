import { Request, Response } from "express";
import Users from "../database/models/users";
import bcrypt from "bcrypt";

export const registerUser = async (req: Request, res: Response) => {
	const { email, password, role, status } = req.body;
	const hashedPassword = await bcrypt.hash(password, 10);
	await Users.create({ email, password: hashedPassword, role, status });
};

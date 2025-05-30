import { Request, Response } from "express";
import Users from "../database/models/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { sendWelcomeMail } from "../utilities";

dotenv.config();

export const registerUser = async (req: Request, res: Response) => {
	try {
		console.log(req.body);
		const { email, password, gender, fullName, status, role } = req.body;
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await Users.create({ email, gender, fullName, password: hashedPassword, status, role: role.trim().toLowerCase() });
		const returnedUser = { email: user.email, status: user.status };
		sendWelcomeMail(email, fullName);
		res.status(201).json({ message: "User created", data: returnedUser });
	} catch (err) {
		console.log(err, "Error creating user");
		res.status(500).json({ message: "Server error", err });
	}
};

export const loginUser = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const searchUser = await Users.findOne({ where: { email } });
		if (searchUser) {
			const isValid = await bcrypt.compare(password, searchUser.password);
			console.log(isValid);
			if (isValid) {
				const accessToken = jwt.sign(
					{ id: searchUser.user_id, email: searchUser.email, role: searchUser.role },
					`${process.env.SECRET}`,
					{
						expiresIn: "1h",
					}
				);
				res.status(200).json({ accessToken, message: "user logged in" });
			} else {
				res.status(401).json({ message: "wrong email or password" });
			}
		}
	} catch (error) {
		res.status(500).json({ message: "server error", error });
	}
};

import { Request, Response } from "express";
import Users from "../database/models/users";
import bcrypt from "bcrypt";

export const registerUser = async (req: Request, res: Response) => {
	try {
		console.log(req.body);
		const { email, password, status, role } = req.body;
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await Users.create({ email, password: hashedPassword, status, role });
		res.status(201).json({ message: "User created", data: user });
	} catch (err) {
		console.log(err, "Error creating user");
		res.status(500).json({ message: "Server error", err });
	}
};


export const loginUser = async( req: Request, res: Response)=>{

}
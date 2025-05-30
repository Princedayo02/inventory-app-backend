import express, { Express, Request, Response } from "express";
import Users from "../database/models/users";

interface IUsers {
	user_id: number;
	role: string;
	email: string;
	password: string;
	status: string;
}

export const getUsers = async (req: Request, res: Response) => {
	try {
		const findUsers = await Users.findAll({ attributes: ["email", "role", "user_id", "status"] });
		res.status(200).json({ message: "Users Fetched", findUsers });
	} catch (error) {
		res.status(401).json({ message: "users not found", error });
	}
};

// export const addUser = async (req: Request, res: Response) => {
// 	const { user_id, role, password, status, email } = req.body;
// 	const createdUser = await Users.create({ user_id, role, password, status, email });
// 	res.status(200).json({ users: createdUser });
// };

export const deleteUser = async (req: Request, res: Response) => {
	try {
		const id = req.body.user_id;
		const deletedUser = await Users.destroy({ where: { user_id: id } });
		res.status(200).json({ deletedUser, message: "User successfully deleted." });
	} catch (error) {
		res.status(500).json({ message: "Error deleting User", error });
	}
};

export const getUserbyId = async (req: Request, res: Response) => {
	const id = req.params.id;
	try {
		const mainUser = await Users.findOne({ where: { user_id: id }, attributes: ["email", "status", "fullName", "role", "gender"] });
		console.log(res.locals.user, "user logged in");
		res.status(200).json(mainUser);
	} catch (err) {
		res.status(500).json({ message: "error getting user by id", err });
	}
};

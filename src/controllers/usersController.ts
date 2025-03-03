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

export const addUser = async (req: Request, res: Response) => {
	const { user_id, role, password, status, email } = req.body;
	const createdUser = await Users.create({ user_id, role, password, status, email });
	res.status(200).json({ users: createdUser });
};

export const deleteUser = (req: Request, res: Response) => {
	// const newUser = Users.filter((user) => {
	// 	return user.user_id !== req.body.id;
	// });
	// res.status(200).json(newUser);
};

export const getUserbyId = async (req: Request, res: Response) => {
	const id = req.params.id;
	const mainUser = await Users.findOne({ where: { user_id: id } });
	console.log(res.locals.user, "user logged in");
	res.status(200).json(mainUser);
};

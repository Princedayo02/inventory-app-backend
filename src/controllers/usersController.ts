import express, { Express, Request, Response } from "express";

interface IUsers {
	user_id: number;
	role: string;
	email: string;
	password: string;
	status: string;
}

const users: IUsers[] = [];

export const getUsers = async (req: Request, res: Response) => {
	res.status(200).json({ message: "User Fetched", users });
};

export const addUser = (req: Request, res: Response) => {
	const { user_id, role, password, status, email } = req.body;
	users.push({ user_id, role, password, status, email });
	res.status(200).json({ users });
};

export const deleteUser = (req: Request, res: Response) => {
	const newUser = users.filter((user) => {
		return user.user_id !== req.body.id;
	});
	res.status(200).json(newUser);
};

export const getUserbyId = (req: Request, res: Response) => {
	const id = req.body;
	const mainUser = users.find((user) => user.user_id === id);
	res.status(200).json(mainUser);
};

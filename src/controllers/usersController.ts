import express, { Express, Request, Response } from "express";
import Users from "../database/models/users";
import { sendWelcomeMail } from "../utilities";
import bcrypt from "bcrypt";
import "dotenv/config";
import { clerkClient, requireAuth, getAuth } from "@clerk/express";

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

export const getProfile = async (req: Request, res: Response) => {
	try {
		console.log(req.auth);
		const { userId } = getAuth(req);
		console.log(userId, "user id from Clerk");
		const getUserProfile = await Users.findOne({ where: { clerkId: userId } });
		res.status(200).json({ getUserProfile, message: "user profile displayed" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "error getting uder's profile", err });
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

export const registerClerkUser = async (req: Request, res: Response) => {
	console.log(req.body.data, "request from clerk webhook");
	try {
		const data = req.body.data;
		const email = data.email_addresses && data.email_addresses.length > 0 ? data.email_addresses[0].email_address ?? "" : "";
		const firstName = data.first_name;
		const clerkId = data.id;
		const lastName = data.last_name;
		const gender = data.gender;
		const role = "user";
		const status = "active";
		const password = await bcrypt.hash("12345srrdfdfttfy6_#", 10);
		console.log(req.body);
		const fullName = firstName + " " + lastName;
		// const hashedPassword = await bcrypt.hash(password, 10);
		const user = await Users.create({ email, password: password, clerkId, gender, fullName, status, role: role.trim().toLowerCase() });
		const returnedUser = { email: user.email, status: user.status };
		// sendWelcomeMail(email, fullName);
		res.status(200).json({ message: "yaay" });
	} catch (err) {
		console.log(err, "Error creating user");
		res.status(500).json({ message: "Server error", err });
	}
};

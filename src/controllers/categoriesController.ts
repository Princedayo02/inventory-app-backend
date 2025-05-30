import { Request, Response } from "express";
import Categories from "../database/models/categories";
import Users from "../database/models/users";

export const getCategories = async (req: Request, res: Response) => {
	try {
		const allCategories = await Categories.findAll({ attributes: ["name", "description", "category_id"] });
		res.status(200).json(allCategories);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "server error", err });
	}
};

export const addCategory = async (req: Request, res: Response) => {
	try {
		const { name, description } = req.body;
		const newCategory = await Categories.create({
			name,
			description,
		});
		await newCategory.save();
		res.status(201).json({ message: "Category created", newCategory });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Error creating category", error });
	}
};

export const getCategory = async (req: Request, res: Response) => {
	const id = req.params.category_id;
	try {
		const category = await Categories.findOne({ where: { category_id: id } });
		if (!category) {
			res.status(404).json({ message: "Category not found" });
		} else {
			res.status(200).json(category);
		}
	} catch (err) {
		res.status(500).json({ message: "error getting categories" });
	}
};

export const editCategory = async (req: Request, res: Response) => {
	try {
		const { category_id, name, description } = req.body;
		if (typeof name !== "string" && typeof description !== "string") {
			res.status(400).json({ message: " input invalid" });
		} else {
			const updatedCategory = await Categories.findOne({ where: { category_id } });
			if (updatedCategory !== null) {
				if (name !== undefined && typeof name == "string") updatedCategory.name = name;
				if (description !== undefined && typeof description == "string") updatedCategory.description = description;
				await updatedCategory.save();
				res.status(200).json({ updatedCategory, message: "Category updated" });
			}
		}
	} catch (err) {
		res.status(500).json({ message: "Error editing category", err });
	}
};

import express, { Express, Request, Response } from "express";
import Categories from "../database/models/categories";
import Inventories from "../database/models/inventorie";
import Products from "../database/models/products";
import Users from "../database/models/users";
import { where } from "sequelize";

export const getInventories = async (req: Request, res: Response) => {
	try {
		const allInventories = await Inventories.findAll({
			attributes: ["inventory_id", "product_id", "transaction_type", "quantity", "reference_number", "performed_by"],
		});
		res.status(200).json(allInventories);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "server error", err });
	}
};

export const performInvetory = async (req: Request, res: Response) => {
	try {
		const { inventory_id, transaction_type, quantity, product_id, reference_number, performed_by } = req.body;
		if (transaction_type === "in") {
			const products = await Products.findOne({ where: { product_id } });
			if (products) {
				const quantityToNumber = parseInt(quantity);
				products.quantity_in_stock = products.quantity_in_stock + quantityToNumber;
				await products.save();
				const addInventory = await Inventories.create({
					inventory_id,
					product_id,
					transaction_type,
					quantity,
					reference_number,
					user_id: performed_by,
				});
				await addInventory.save();
				res.status(201).json({ message: "Inventory created", addInventory });
			}
		} else if (transaction_type === "out") {
			console.log(product_id);
			const product = await Products.findOne({ where: { product_id } });
			if (product) {
				const quantityToNuber = parseInt(quantity);
				console.log(quantityToNuber, product.quantity_in_stock);
				if (product.quantity_in_stock >= quantityToNuber) {
					product.quantity_in_stock = product.quantity_in_stock - quantityToNuber;
					await product.save();
					const newInventory = await Inventories.create({
						inventory_id,
						product_id,
						transaction_type,
						quantity,
						reference_number,
						user_id: performed_by,
					});
					await newInventory.save();
					res.status(201).json({ message: "Inventory created", newInventory });
				} else {
					res.status(400).json({ message: "Insufficient quantity" });
				}
			}
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "error creating inventory", error });
	}
};

export const getInventory = async (req: Request, res: Response) => {
	const id = req.params.inventory_id;
	const inventory = await Inventories.findOne({ where: { inventory_id: id } });
	try {
		if (!inventory) {
			res.status(404).json({ message: "inventory not found" });
		} else {
			res.status(200).json(inventory);
		}
	} catch (err) {
		res.status(500).json({ message: "error getting inventories" });
	}
};

export const editInventory = async (req: Request, res: Response) => {
	try {
		const { inventory_id, product_id, transaction_type, quantity, reference_number, performed_by } = req.body;
		if (typeof inventory_id !== "string" && typeof product_id !== "string") {
			res.status(400).json({ message: " input invalid" });
		} else {
			const updatedInventory = await Inventories.findOne({ where: { inventory_id } });
			if (updatedInventory !== null) {
				if (transaction_type !== undefined && typeof transaction_type == "string")
					updatedInventory.transaction_type = transaction_type;
				if (quantity !== undefined && typeof quantity == "string") updatedInventory.quantity = quantity;
				if (reference_number !== undefined && typeof reference_number == "string")
					updatedInventory.reference_number = reference_number;
				if (performed_by !== undefined) updatedInventory.perfomed_by = performed_by;
				await updatedInventory.save();
				res.status(200).json({ updatedInventory, message: "Updated inventory profile" });
			}
		}
	} catch (err) {
		res.status(400).json({ message: "Error editing inventory", err });
	}
};

export const putInventory = async (req: Request, res: Response) => {
	try {
		const { inventory_id, product_id, transaction_type, quantity, reference_number, performed_by } = req.body;
		const updateInventory = await Inventories.findOne({ where: { inventory_id } });
		if (updateInventory !== null) {
			updateInventory.product = product_id;
			updateInventory.transaction_type = transaction_type;
			updateInventory.quantity = quantity;
			updateInventory.reference_number = reference_number;
			updateInventory.perfomed_by = performed_by;
			updateInventory.save();
			res.status(200).json({ updateInventory, message: "Updated Edition" });
		}
	} catch (err) {
		res.status(400).json({ message: "Error editing inventory", err });
	}
};

export const deleteInventory = async (req: Request, res: Response) => {
	try {
		const id = req.body.inventory_id;
		const deletedInventory = await Inventories.destroy({ where: { inventory_id: id } });
		res.status(200).json({ deletedInventory, message: "Inventory successfully deleted." });
	} catch (error) {
		res.status(500).json({ message: "Error deleting inventory", error });
	}
};

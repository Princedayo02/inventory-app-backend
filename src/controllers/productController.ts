import { Request, Response } from "express";
import { generateSKU } from "../utilities";
import Products from "../database/models/products";

export const addProducts = async (req: Request, res: Response) => {
	const { name, description, category_id, unit_price, quantity_in_stock, reorder_level } = req.body;
	const sku = generateSKU(name);
	const userId = res.locals.user.id;
	try {
		console.log(name, "product name");
		console.log(description, "product description");
		console.log(category_id, "product category");
		console.log(unit_price, "product unit price");
		console.log(sku, "product sku");
		console.log(quantity_in_stock, "product quantity");
		console.log(reorder_level, "product reorder level");
		console.log(userId, "user id");
		const createdProduct = await Products.create({
			name,
			description,
			category_id,
			unit_price,
			sku,
			quantity_in_stock,
			reorder_level,
			user_id: userId,
		});
		// Products.find({where:{}})

		res.status(201).json({ message: "Product successfully created" });
	} catch (error) {
		res.status(501).json({ message: "Error creating product", error });
	}
};

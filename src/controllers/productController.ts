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
export const getProducts = async (req: Request, res: Response) => {
	try {
		const newProducts = await Products.findAll({
			attributes: ["name", "description", "category_id", "unit_price", "sku", "quantity_in_stock", "reorder_level", "user_id"],
		});
		res.status(200).json({ message: "Products", newProducts });
	} catch (error) {
		res.status(500).json({ message: "error finding products", error });
	}
};

export const getProductsById = async (req: Request, res: Response) => {
	try {
		const product_id = req.params.product_id;
		console.log(product_id);
		const product = await Products.findAll({ where: { product_id } });
		res.status(200).json({ message: "Products by category", product });
	} catch (err) {
		res.status(500).json({ message: "Error geting products by category", err });
	}
};

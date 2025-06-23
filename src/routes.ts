import express from "express";
import { getUsers, deleteUser, getUserbyId, registerClerkUser, getProfile } from "./controllers/usersController";
import { getInventory, performInvetory, getInventories, editInventory, putInventory, deleteInventory } from "./controllers/inventoryController";
import { loginUser, registerUser } from "./controllers/authController";
import { authToken } from "./middleware/authenticateMiddleware";
import { checkAdminRole } from "./middleware/adminMiddleware";
import { addProducts, getProducts, getProductsById } from "./controllers/productController";
import { getCategories, getCategory, addCategory, editCategory } from "./controllers/categoriesController";
import { requireAuth } from "@clerk/express";
import "dotenv/config";

const router = express.Router();

//Routes for users
router.get("/user", authToken, checkAdminRole, getUsers);
router.delete("/user/:id", authToken, checkAdminRole, deleteUser);
router.get("/user/:id", authToken, getUserbyId);
router.get("/profile", requireAuth(), getProfile);

//Inventory routes
router.get("/inventory/:id", getInventory);
router.get("/inventory", getInventories);
router.post("/inventory", performInvetory);
router.put("/inventory", putInventory);
router.put("/inventory/:id", editInventory);
router.delete("/inventory", deleteInventory);

//Routes for registeration and login
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);

//Products routes
router.post("/products", requireAuth(), addProducts);
router.get("/products", requireAuth(), getProducts);
router.get("/products/:product_id", requireAuth(), getProductsById);

//Category routes
router.get("/category", getCategories);
router.get("/category/:category_id", getCategory);
router.post("/category", addCategory);
router.put("/category/:id", editCategory);

//Clerk endpoint

router.post("/clerk/webhook", registerClerkUser);

export default router;

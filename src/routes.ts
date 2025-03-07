import express from "express";
import { getUsers, deleteUser, getUserbyId } from "./controllers/usersController";
import { getInventory, addInvetory, getInventories, editInventory, putInventory, deleteInventory } from "./controllers/inventoryController";
import { loginUser, registerUser } from "./controllers/authController";
import { authToken } from "./middleware/authenticateMiddleware";
import { checkAdminRole } from "./middleware/adminMiddleware";
import { addProducts } from "./controllers/productController";
import { getCategories, getCategory, addCategory, editCategory } from "./controllers/categoriesController";

const router = express.Router();

//Routes for users
router.get("/user", authToken, checkAdminRole, getUsers);
router.delete("/user", deleteUser);
router.get("/user/:id", authToken, getUserbyId);

//Inventory routes
router.get("/inventory/:id", getInventory);
router.get("/inventory", getInventories);
router.post("/inventory", addInvetory);
router.put("/inventory", putInventory);
router.put("/inventory/:id", editInventory);
router.delete("/inventory", deleteInventory);

//Routes for registeration and login
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);

//Products routes
router.post("/products", authToken, checkAdminRole, addProducts);

//Category routes
router.get("/category", getCategories);
router.get("/category", getCategory);
router.post("/category", addCategory);
router.put("/category", editCategory);

export default router;

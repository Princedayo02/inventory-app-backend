import express from "express";
import { getUsers, deleteUser, getUserbyId } from "./controllers/usersController";
import { getInventory, addInvetory, getInventories, editInventory, putInventory, deleteInventory } from "./controllers/inventoryController";
import { loginUser, registerUser } from "./controllers/authController";
import { authToken } from "./middleware/authenticateMiddleware";

const router = express.Router();

router.get("/user", getUsers);
router.delete("/user", deleteUser);
router.get("/user/:id", authToken, getUserbyId);

router.get("/inventory/:id", getInventory);
router.get("/inventory", getInventories);
router.post("/inventory", addInvetory);
router.put("/inventory", putInventory);
router.put("/inventory/:id", editInventory);
router.delete("/inventory", deleteInventory);

router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);

export default router;

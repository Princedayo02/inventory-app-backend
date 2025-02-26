import express from "express";
import { getUsers, addUser, deleteUser, getUserbyId } from "./controllers/usersController";
import { getInventory, addInvetory, getInventories, editInventory, putInventory, deleteInventory } from "./controllers/inventoryController";
import { registerUser } from "./controllers/authController";

const router = express.Router();

router.get("/user", getUsers);
router.post("/user", addUser);
router.delete("/user", deleteUser);
router.get("/user", getUserbyId);

router.get("/inventory/:id", getInventory);
router.get("/inventory", getInventories);
router.post("/inventory", addInvetory);
router.put("/inventory", putInventory);
router.put("/inventory/:id", editInventory);
router.delete("/inventory", deleteInventory);

router.post("/auth", registerUser);

export default router;

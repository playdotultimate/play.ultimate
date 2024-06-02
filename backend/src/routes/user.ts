import express from "express";
import { update, deleteUser, getUser } from "../controllers/user";
import verifyToken from "../middleware/verifyToken";
const router = express.Router();

// Update user
router.put("/:id", verifyToken, update);

// Delete user
router.delete("/:id", verifyToken, deleteUser);

// Get a user
router.get("/find/:id", verifyToken, getUser);

export default router;

import { User } from "../models/user";
import * as express from "express";
import { verifyToken } from "../middleware/auth";
import { UserRepository } from "../repositories/user";

const router = express.Router();

// Get one user by username
router.get("/username/:username", async (req, res) => {
  const user = await UserRepository.getUserByUsername(req.params.username);
  res.status(200).send(JSON.stringify(user));
});

// Find users by username (username starts with the query)
router.get("/search", async (req, res) => {
  let query = req.query.query as string;
  let users: User[] = await UserRepository.searchUsersByQuery(query);
  return res.status(200).send(JSON.stringify(users));
});

// Get user by id
router.get("/:id", async (req, res) => {
  const user = await UserRepository.getUserById(req.params.id);
  res.status(200).send(JSON.stringify(user));
});

// Create a new user
router.post("/", async (req, res) => {
  const user = req.body;
  const userCreated = await UserRepository.createUser(
    user.id,
    user.email,
    user.username
  );
  if (userCreated) {
    res.status(201).send();
  } else {
    res
      .status(409)
      .send(JSON.stringify({ message: "Username already in use." }));
  }
});

// Update a user
router.put("/:id", verifyToken, async (req, res) => {
  const userUpdated = await UserRepository.updateUser(req.params.id, req.body);
  if (userUpdated) {
    res.status(200).send();
  } else {
    res
      .status(409)
      .send(JSON.stringify({ message: "Username already in use." }));
  }
});

// Delete a user
router.delete("/:id", verifyToken, async (req, res) => {
  await UserRepository.deleteUser(req.params.id);
  res.status(200).send();
});

module.exports = router;

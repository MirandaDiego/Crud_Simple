const { Router } = require("express");
const UserController = require("../Controllers/userController");
const userRoutes = Router();

const usersController = new UserController();

userRoutes.post("/", usersController.create)
userRoutes.delete("/:id", usersController.delete)
userRoutes.get("/:name", usersController.show)
userRoutes.put("/:id", usersController.update)
userRoutes.get("/", usersController.showUsers)

module.exports = userRoutes;
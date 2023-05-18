import express from "express";

import { userController } from "./dependencies";

export const userRouter = express.Router();

userRouter.get("/:id/welcome", userController.run.bind(userController));

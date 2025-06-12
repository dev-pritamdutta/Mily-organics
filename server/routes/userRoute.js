import express from "express";
import {
  getAllUsers,
  isAuth,
  login,
  logout,
  register,
} from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/is-auth", authUser, isAuth);
userRouter.get("/logout", authUser, logout);
userRouter.get("/list", getAllUsers);

export default userRouter;

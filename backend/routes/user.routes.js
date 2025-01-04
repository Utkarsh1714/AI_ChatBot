import { Router } from "express";
import * as userController from "../controller/userController.js";
import { body } from "express-validator";
import * as authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

// REGISTER USER
router.post(
  "/register",
  body("email").isEmail().withMessage("Email must be a valid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 characters long"),
  userController.createUserController
);

// LOGIN USER
router.post(
  "/login",
  body("email").isEmail().withMessage("Email must be a valid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 characters long"),
  userController.loginController
);

// GET USER
router.get(
  "/profile",
  authMiddleware.authUser,
  userController.profileController
);

// LOGOUT USER
router.get("/logout", authMiddleware.authUser, userController.logoutController);

// GET ALL USER
router.get(
  "/all",
  authMiddleware.authUser,
  userController.getAllUsersController
);

export default router;

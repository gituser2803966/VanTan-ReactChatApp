import express from "express";
import {
  Register,
  Login,
  LoginWithSessionCookie,
  Logout,
  GetAllUser,
} from "../controllers/UserController.js";

const router = express.Router();

// get all user
router.get("/all", GetAllUser);
// route login with exist session
router.get("/login", LoginWithSessionCookie);
//route login data (email,password,...)
router.post("/login", Login);
// route register
router.post("/register", Register);
// route lohout
router.get("/logout", Logout);
// upload profile
// router.post("/uploadAvatar",upload.single('avatar'),UploadProfile);

export default router;

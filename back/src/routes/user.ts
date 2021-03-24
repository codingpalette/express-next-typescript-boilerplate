import express from 'express';
import {isLoggedIn, isNotLoggedIn} from "./middlewares";

const router = express.Router();

import {getUser, createUser, loginUser, logoutUser} from "../controllers/user.controller";

router.get("/user", getUser);
router.post("/user", createUser);
router.post("/user/login", [isNotLoggedIn], loginUser);
router.post("/user/logout", [isLoggedIn], logoutUser)

export default router;

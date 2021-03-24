"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var middlewares_1 = require("./middlewares");
var router = express_1.default.Router();
var user_controller_1 = require("../controllers/user.controller");
router.get("/user", user_controller_1.getUser);
router.post("/user", user_controller_1.createUser);
router.post("/user/login", [middlewares_1.isNotLoggedIn], user_controller_1.loginUser);
router.post("/user/logout", [middlewares_1.isLoggedIn], user_controller_1.logoutUser);
exports.default = router;

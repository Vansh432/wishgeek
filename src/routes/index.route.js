import { Router } from "express";
import user from "./users/user.route.js";
import admin from './admin/admin.route.js'
import { loginValidationSchema, userRegisterValidationSchema, validate } from "../middlewares/validator.middleware.js";
import { loginUser, refreshToken, registerUser } from "../controllers/global.controller.js";
import { authMiddleware, isAdmin, isNormalUser } from "../middlewares/auth.middleware.js";
import { authLimiter } from "../middlewares/rateLimiting.middleware.js";
const route=Router();

route.post('/auth/register',authLimiter,validate(userRegisterValidationSchema),registerUser)
route.post('/auth/login',authLimiter,validate(loginValidationSchema),loginUser);
route.post('/newAccessToken',authLimiter,refreshToken)
route.use(authMiddleware)
route.use('/admin',isAdmin,admin)
route.use('/',isNormalUser,user)


export default route;
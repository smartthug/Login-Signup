import express from 'express';
import { signin, login, otpVerify, logout, forgotPassword, reset, check_auth } from '../Controller/auth_conntroller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signin);
router.post('/otp-verify', otpVerify);
router.post('/logout', logout);
router.post('/forgot', forgotPassword);
router.post('/reset-password/:token', reset);
router.get('/check-auth', verifyToken, check_auth);

export const authRouter= router;
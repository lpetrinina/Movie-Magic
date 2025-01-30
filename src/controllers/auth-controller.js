import { Router } from "express";
import authServise from "../services/auth-servise.js";

const authController = Router();

authController.get('/register', (req, res) => {
    res.render('auth/register');
});

authController.post('/register', async (req, res) => {
    const userData = req.body;

    await authServise.register(userData);
    res.end();

});

export default authController;
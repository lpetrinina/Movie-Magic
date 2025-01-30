import { Router } from "express";
import authServise from "../services/auth-servise.js";

const authController = Router();

authController.get('/register', (req, res) => {
    res.render('auth/register');
});

authController.post('/register', async (req, res) => {
    const userData = req.body;

    await authServise.register(userData);
    res.redirect('/auth/login');

});


authController.get('/login', (req, res) => {
    res.render('auth/login');
});

authController.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {

        const token = await authServise.login(email, password);
        console.log(token);


    } catch (error) {

        console.log(error.message);
        return res.redirect('/404')
    }

    res.redirect('/');
});

export default authController;
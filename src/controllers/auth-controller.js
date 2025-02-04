import { Router } from "express";

import authServise from "../services/auth-servise.js";
import { isAuth } from "../middlewares/auth-middleware.js";

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

        //Set cookie
        res.cookie('auth', token, { httpOnly: true });
        res.redirect('/');

    } catch (error) {

        console.log(error.message);
        res.redirect('/404')
    }

});

authController.get('/logout', isAuth, (req, res) => {
    res.clearCookie('auth');

    res.redirect('/');
})

export default authController;
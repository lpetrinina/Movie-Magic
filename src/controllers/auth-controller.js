import { Router } from "express";

import authServise from "../services/auth-servise.js";
import { isAuth } from "../middlewares/auth-middleware.js";
import { getErrorMessage } from "../utils/error-util.js";

const authController = Router();

authController.get('/register', (req, res) => {
    res.render('auth/register');
});

authController.post('/register', async (req, res) => {
    const userData = req.body;

    try {
        await authServise.register(userData);

    } catch (err) {
        const error = getErrorMessage(err);

        // Show error on the page
        return res.render('auth/register', { error })

        // //Return to register page
        // return res.redirect('/auth/register');
    }

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

    } catch (err) {
        res.render('auth/login', { error: getErrorMessage(err) })
    }

});

authController.get('/logout', isAuth, (req, res) => {
    res.clearCookie('auth');

    res.redirect('/');
})

export default authController;
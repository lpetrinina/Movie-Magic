import { Router } from "express";

import castServise from "../services/cast-servise.js";
import { isAuth } from "../middlewares/auth-middleware.js";
import { getErrorMessage } from "../utils/error-util.js";

const castController = Router();
castController.use(isAuth);

castController.get('/create', (req, res) => {
    res.render('cast/create');
});

castController.post('/create', async (req, res) => {
    const castData = req.body;

    try {
        await castServise.create(castData);

    } catch (err) {
        const error = getErrorMessage(err);
        return res.render('cast/create', { error });
    }

    res.redirect('/');

})

export default castController;
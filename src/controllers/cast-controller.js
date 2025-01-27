import { Router } from "express";
import castServise from "../services/cast-servise.js";

const castController = Router();

castController.get('/create', (req, res) => {
    res.render('cast/create');
});

castController.post('/create', async (req, res) => {
    const castData = req.body;

    await castServise.create(castData);

    res.redirect('/');

})

export default castController;
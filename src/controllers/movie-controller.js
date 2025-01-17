import { Router } from 'express';

const movieControler = Router();

movieControler.get('/create', (req, res) => {
    res.render('create');
})

export default movieControler;
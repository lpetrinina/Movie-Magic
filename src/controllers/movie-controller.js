import { Router } from 'express';

const movieControler = Router();

movieControler.get('/create', (req, res) => {
    res.render('create');
});

movieControler.get('/:movieId/details', (req, res) => {
    res.render('details');
})

export default movieControler;
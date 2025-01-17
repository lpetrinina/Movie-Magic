import { Router } from 'express';

import movieServise from '../services/movie-servise.js';


const movieControler = Router();

movieControler.get('/create', (req, res) => {
    res.render('create');
});

movieControler.get('/:movieId/details', (req, res) => {

    const movieId = req.params.movieId;
    const movie = movieServise.findMovie(movieId);


    res.render('details', { movie });
})

export default movieControler;
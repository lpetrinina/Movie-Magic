import { Router } from 'express';

import movieServise from '../services/movie-servise.js';


const movieControler = Router();

movieControler.get('/search', (req, res) => {
    res.render('search');
})

movieControler.get('/create', (req, res) => {
    res.render('create');
});

movieControler.post('/create', (req, res) => {
    const newMovie = req.body;

    movieServise.create(newMovie);

    res.redirect('/');
})

movieControler.get('/:movieId/details', (req, res) => {

    const movieId = req.params.movieId;
    const movie = movieServise.findMovie(movieId);

    res.render('details', { movie });
})

export default movieControler;
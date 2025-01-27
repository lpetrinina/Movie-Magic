import { Router } from 'express';

import movieServise from '../services/movie-servise.js';
import castServise from '../services/cast-servise.js';


const movieControler = Router();

movieControler.get('/search', async (req, res) => {
    const filter = req.query;
    const movies = await movieServise.getAll(filter);

    res.render('search', { movies, filter });
})

movieControler.get('/create', (req, res) => {
    res.render('create');
});

movieControler.post('/create', async (req, res) => {
    const newMovie = req.body;

    await movieServise.create(newMovie);

    res.redirect('/');
});

movieControler.get('/:movieId/details', async (req, res) => {

    const movieId = req.params.movieId;
    const movie = await movieServise.getMovie(movieId);

    res.render('movie/details', { movie });
});

movieControler.get('/:movieId/attach-cast', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieServise.getMovie(movieId);
    const casts = await castServise.getAll();

    res.render('movie/attach-cast', { movie, casts })
})

export default movieControler;
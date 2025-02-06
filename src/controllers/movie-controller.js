import { Router } from 'express';

import movieServise from '../services/movie-servise.js';
import castServise from '../services/cast-servise.js';
import { isAuth } from '../middlewares/auth-middleware.js';
import { getErrorMessage } from '../utils/error-util.js';


const movieControler = Router();

// ---------------- SEARCH PAGE ----------------------------
movieControler.get('/search', async (req, res) => {
    const filter = req.query;
    const movies = await movieServise.getAll(filter);

    res.render('search', { movies, filter });
})


// ---------------- CREATE MOVIE ----------------------------
movieControler.get('/create', isAuth, (req, res) => {
    res.render('create');
});

movieControler.post('/create', isAuth, async (req, res) => {
    const newMovie = req.body;
    const creatorId = req.user?.id;

    try {
        await movieServise.create(newMovie, creatorId);

    } catch (err) {
        const error = getErrorMessage(err);
        return res.render('create', { error, movie: newMovie });

    }

    return res.redirect('/');
});


// ---------------- DETAILS PAGE ----------------------------
movieControler.get('/:movieId/details', async (req, res) => {

    const movieId = req.params.movieId;
    const movie = await movieServise.getMovie(movieId);

    const isCreator = movie.creator && movie.creator.toString() === req.user?.id; // or movie.creator?.equals(req.user?.id)

    res.render('movie/details', { movie, isCreator });
});


// ---------------- CREATE CAST ----------------------------
movieControler.get('/:movieId/attach-cast', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieServise.getMovie(movieId);

    const casts = await castServise.getAll({ exclude: movie.casts });

    res.render('movie/attach-cast', { movie, casts })
});

movieControler.post('/:movieId/attach-cast', isAuth, async (req, res) => {

    const castId = req.body.cast;
    const movieId = req.params.movieId;
    await movieServise.attachCast(movieId, castId);

    res.redirect(`/movies/${movieId}/details`);
});

// ---------------- DELETE MOVIE ----------------------------
movieControler.get('/:movieId/delete', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieServise.getMovie(movieId);

    // Check if user is creator
    if (!movie.creator?.equals(req.user?.id)) {
        return res.redirect('/404');
    }

    await movieServise.delete(movieId);
    res.redirect('/');

});

// ---------------- EDIT MOVIE ----------------------------
movieControler.get('/:movieId/edit', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieServise.getMovie(movieId);

    const categories = getCategoriesViewData(movie.category);

    res.render('movie/edit', { movie, categories });

});

function getCategoriesViewData(category) {
    let categoriesMap = {
        'tv-show': 'TV Show',
        'animation': 'Animation',
        'movie': 'Movie',
        'documentary': 'Documentary',
        'short-film': 'Short Film'
    };

    const categories = Object.keys(categoriesMap).map(value => ({
        value: value,
        label: categoriesMap[value],
        selected: value === category ? 'selected' : '',
    }));

    return categories;
};

movieControler.post('/:movieId/edit', isAuth, async (req, res) => {
    const movieData = req.body;
    const movieId = req.params.movieId;

    // TODO: Check if user is creator

    try {
        await movieServise.update(movieId, movieData);

    } catch (err) {
        const categories = getCategoriesViewData(movieData.category);
        const error = getErrorMessage(err);

        return res.render('movie/edit', error, categories);

    }

    res.redirect(`/movies/${movieId}/details`);
});

export default movieControler;
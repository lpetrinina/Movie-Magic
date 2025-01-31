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
    const creatorId = req.user?.id;
    console.log(creatorId);


    await movieServise.create(newMovie, creatorId);

    res.redirect('/');
});



movieControler.get('/:movieId/details', async (req, res) => {

    const movieId = req.params.movieId;
    const movie = await movieServise.getMovie(movieId);

    const isCreator = movie.creator && movie.creator.toString() === req.user?.id; // or movie.creator?.equals(req.user?.id)

    res.render('movie/details', { movie, isCreator });
});



movieControler.get('/:movieId/attach-cast', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieServise.getMovie(movieId);

    const casts = await castServise.getAll({ exclude: movie.casts });

    res.render('movie/attach-cast', { movie, casts })
});

movieControler.post('/:movieId/attach-cast', async (req, res) => {

    const castId = req.body.cast;
    const movieId = req.params.movieId;
    await movieServise.attachCast(movieId, castId);

    res.redirect(`/movies/${movieId}/details`);
});


movieControler.get('/:movieId/delete', async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieServise.getMovie(movieId);
    // Check if user is creator
    if (!movie.creator?.equals(req.user?.id)) {
        return res.redirect('/404');
    }

    await movieServise.delete(movieId);
    res.redirect('/');

});


movieControler.get('/:movieId/edit', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieServise.getMovie(movieId);

    const categories = getCategoriesViewData(movie.category);
    console.log(categories);


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

export default movieControler;
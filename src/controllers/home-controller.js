
import { Router } from 'express';
import movieServise from '../services/movie-servise.js';


const router = Router();

router.get('/', (req, res) => {
    const movies = movieServise.getAll();
    res.render('home', { movies });

});

router.get('/about', (req, res) => {
    res.render('about');
})

export default router;

import { Router } from 'express';
import movieServise from '../services/movie-servise.js';


const router = Router();

router.get('/', async (req, res) => {

    // Second solution - use .lean() to query to get plain object 
    // .lean() convert documents to plain object, which means that cannot use document methods like(.save(), .validate() ...)
    const movies = await movieServise.getAll();

    // First solution - convert documents to objects
    // Convert documents to plain objects
    // const plainMovies = movies.map(m => m.toObject());


    // *Third solution is to use allowProtoPropertiesByDefaul runtimeOption in handlebars configuration
    res.render('home', { movies });

});

router.get('/about', (req, res) => {
    res.render('about');
})

export default router;
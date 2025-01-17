import { Router } from 'express';

import homeController from './controllers/home-controller.js';
import movieControler from './controllers/movie-controller.js';

const routes = Router();

routes.use(homeController);
routes.use(movieControler);

routes.get('*', (req, res) => {
    res.render('404')
})

export default routes;
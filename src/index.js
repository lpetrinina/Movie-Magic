
import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import 'dotenv/config';

import routes from './routes.js';
import showRatingHelper from './helpers/rating-helper.js';

const app = express();

// DB configuration
try {
    const defaultUri = 'mongodb://localhost:27017/magic-movies';
    await mongoose.connect(process.env.DATABASE_URI ?? defaultUri);

    console.log('DB Connected successfully!');

} catch (err) {
    console.log('Cannot connect to DB!');
    console.error(err.message);
}

// Handlebars configuration 
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    },
    helpers: {
        showRating: showRatingHelper
    }
}));

app.set('view engine', 'hbs');
app.set('views', './src/views');

// Express configuration
app.use('/static', express.static('src/public'));
app.use(express.urlencoded({ extended: false })); //Learn express to parse form data


// Setup routes
app.use(routes);


// Start server
app.listen(5000, () => console.log('Server is listenig on http://localhost:5000... '));

import movies from "../movies.js";
import Movie from '../models/Movie.js';



export default {

    getAll(filter = {}) {
        let query = Movie.find({});


        if (filter.search) {
            // TODO: fix partial case insensitive search
            query = query.where({ title: filter.search });
        }

        if (filter.genre) {
            // TODO: add case insensitive search
            query = query.where({ genre: filter.genre });
        }

        if (filter.year) {
            query = query.where({ year: Number(filter.year) });
        }

        return query;
    },

    getMovie(movieId) {

        // TODO: If movie is missing?

        const result = Movie.findById(movieId);

        return result;
    },

    create(movieData) {

        const result = Movie.create({
            ...movieData,
            rating: Number(movieData.rating),
            year: Number(movieData.year)
        });

        return result;
    }
}


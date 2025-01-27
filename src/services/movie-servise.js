import { v4 as uuid } from 'uuid';
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
        // TODO: Add IDs
        const newId = uuid();

        movies.push({
            id: newId,
            ...movieData,
            rating: Number(movieData.rating)
        });

        return newId;
    }
}


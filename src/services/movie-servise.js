import { v4 as uuid } from 'uuid';
import movies from "../movies.js";



export default {

    findMovie(movieId) {

        // TODO: If movie is missing?

        const result = movies.find(movie => movie.id === movieId);

        return result;
    },

    create(movieData) {
        // TODO: Add IDs
        const newId = uuid();

        movies.push({
            id: newId,
            ...movieData
        });

        return newId;
    }
}


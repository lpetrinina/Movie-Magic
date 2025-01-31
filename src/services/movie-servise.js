
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
        const result = Movie.findById(movieId).populate('casts');

        return result;
    },

    create(movieData, creatorId) {

        const result = Movie.create({
            ...movieData,
            rating: Number(movieData.rating),
            year: Number(movieData.year),
            creator: creatorId,
        });

        return result;
    },

    async attachCast(movieId, castId) {
        //first way to attach
        // const movie = await Movie.findById(movieId);
        // movie.casts.push(castId);

        // await movie.save();

        // return movie;

        // Second way to attach
        return Movie.findByIdAndUpdate(movieId, { $push: { casts: castId } });

    }
}


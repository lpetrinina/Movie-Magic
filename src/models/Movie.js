import { Schema, model, Types } from "mongoose";



// Create schema
const movieSchema = new Schema({
    title: String,
    category: String,
    genre: String,
    director: String,
    year: Number,
    rating: Number,
    description: String,
    imageUrl: String,
    casts: [{
        type: Types.ObjectId,
        ref: 'Cast'
    }],
});

// Create model
const Movie = model('Movie', movieSchema);

export default Movie;
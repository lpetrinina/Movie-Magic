import { Schema, model } from "mongoose";



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
});

// Create model
const Movie = model('Movie', movieSchema);

export default Movie;
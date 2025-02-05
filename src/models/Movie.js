import { Schema, model, Types } from "mongoose";



// Create schema
const movieSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required!'],
        minLength: [5, 'Title should be at least 5 characters long!'],
        match: [/^[a-zA-Z0-9 ]+$/, 'Title should be alphanumeric, digits, and whitespaces only!'], //English letters, digits, and whitespaces 
    },
    category: String,
    genre: {
        type: String,
        required: [true, 'Genre is required!'],
        minLength: [5, 'Genre should be at least 5 characters long!'],
        match: [/^[a-zA-Z0-9 ]+$/, 'Genre should be alphanumeric, digits, and whitespaces only!'],
    },
    director: {
        type: String,
        required: [true, 'Director is required!'],
        minLength: [5, 'Director should be at least 5 characters long!'],
        match: [/^[a-zA-Z0-9 ]+$/, 'Director should be alphanumeric, digits, and whitespaces only!'],
    },
    year: {
        type: Number,
        required: [true, 'Year is required!'],
        min: 1900,
        max: 2025,
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required!'],
        min: 1,
        max: 10,
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [20, 'Description should be at least 20 characters long!'],
        match: [/^[a-zA-Z0-9 ]+$/, 'Description should be alphanumeric, digits, and whitespaces only!'],
    },
    imageUrl: {
        type: String,
        required: [true, 'Image is required!'],
        match: /^https?:\/\//, //url should start with http://... or https://...
    },
    casts: [{
        type: Types.ObjectId,
        ref: 'Cast'
    }],
    creator: {
        type: Types.ObjectId,
        ref: 'User'
    }
});

// Create model
const Movie = model('Movie', movieSchema);

export default Movie;
import { Schema, model } from "mongoose";


const castSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [5, 'Name should be at least 5 characters long!'],
        match: [/^[a-zA-Z0-9 ]+$/, 'Name should be alphanumeric, digits, and whitespaces only!'],
    },
    age: {
        type: Number,
        min: 1,
        max: 120
    },
    born: {
        type: String,
        required: [true, 'Born is required!'],
        minLength: [10, 'Born should be at least 10 characters long!'],
        match: [/^[a-zA-Z0-9 ]+$/, 'Born should be alphanumeric, digits, and whitespaces only!'],
    },
    imageUrl: {
        type: String,
        required: [true, 'Image is required!'],
        match: /^https?:\/\//, //url should start with http://... or https://...
    },
});

const Cast = model('Cast', castSchema);

export default Cast;
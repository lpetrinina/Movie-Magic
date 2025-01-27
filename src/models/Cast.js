import { Schema, model } from "mongoose";

// •	name – String, required 
// •	age – Number, required, max and min value 
// •	born – String, required 
// •	name in movie – String, required 
// •	cast image – String, required, http/https validation 
// •	movie – ObjectId, ref Movie Model 

const castSchema = new Schema({
    name: String,
    age: Number,
    born: String,
    imageUrl: String,
});

const Cast = model('Cast', castSchema);

export default Cast;
import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';


const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required!'],
        unique: true,
        lowercase: true, //sanitizer (modify email to lowercase string)
        match: /\@[a-zA-Z]+.[a-zA-Z]+$/,
        minLength: 10,
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        match: [/[a-zA-z-0-9]+/, 'Password should be alphanumeric and digits only!'],
        minLength: [6, 'Password should be at least 6 characters! long'],
        trim: true //sanitizer
    },
});

// Hash pasword before save it
userSchema.pre('save', async function () {

    // TODO: fix update user bug

    // get plain pass and generate hash with 10 rounds
    this.password = await bcrypt.hash(this.password, 10);
})

const User = model('User', userSchema);

export default User;
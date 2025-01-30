import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';


const userSchema = new Schema({
    email: String,
    password: String
});

// Hash pasword before save it
userSchema.pre('save', async function () {

    // TODO: fix update user bug

    // get plain pass and generate hash with 10 rounds
    this.password = await bcrypt.hash(this.password, 10);
})

const User = model('User', userSchema);

export default User;
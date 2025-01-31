import User from "../models/User.js";
import bcrupt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'BASICSECRET';

export default {

    register(userData) {

        // Create new user by User model in database
        return User.create(userData);
    },

    async login(email, password) {

        // Check if the user exists in database
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('Invalid email or password!');
        }

        // Check if the password is correct 
        const isValid = await bcrupt.compare(password, user.password);

        if (!isValid) {
            throw new Error('Invalid email or password!');
        }

        // Generate JWT token
        const payload = {
            id: user._id,
            email: user.email
        };

        // TODO: use async option
        const token = jwt.sign(payload, SECRET, { expiresIn: '2h' });

        // return the generated token
        return token;

    }
}
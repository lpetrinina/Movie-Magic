import User from "../models/User.js";
import bcrupt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET = 'frJwpXsbepe37iSkoMwGLDrosHcsOLHD64ndyKqe9nqA5PJhd02YucJ4pJke';

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

        // Chech if the password is correct 
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
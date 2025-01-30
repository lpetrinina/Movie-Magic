import User from "../models/User.js";

export default {

    register(userData) {

        // Create new user by User model in database
        return User.create(userData);

    }
}
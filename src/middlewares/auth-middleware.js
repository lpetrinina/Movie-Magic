import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'BASICSECRET';

export const authMiddleware = (req, res, next) => {


    // Get token from auth cookie
    const token = req.cookies['auth']

    // Check if user has token (if has NOT it is a guest)
    if (!token) {
        return next();
    }

    try {
        // Validate and decode the token
        const decodedToken = jwt.verify(token, SECRET);

        // Attach decoded token to request
        req.user = decodedToken;

        next();
    } catch (error) {
        // TODO: Invalid token

    }


}
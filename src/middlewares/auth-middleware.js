import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'BASICSECRET';

export const authMiddleware = (req, res, next) => {


    // Get token from auth cookie
    const token = req.cookies['auth']

    // Check if user has token (if has NOT it is a guest)
    if (!token) {
        return next();
    };

    try {
        // Validate and decode the token
        const decodedToken = jwt.verify(token, SECRET);

        // Attach decoded token to request
        req.user = decodedToken;
        res.locals.user = decodedToken;

        next();
    } catch (error) {
        // If token is invalid(wrong or expired)

        res.clearCookie('auth'); //delete cookie(reset session)
        res.redirect('/auth/login');

    };

};

export const isAuth = (req, res, next) => {

    // Check id user has token(logged user)
    if (!req.user) {
        res.redirect('/auth/login');
    }

    next();
}
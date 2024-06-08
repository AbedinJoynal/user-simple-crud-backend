const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token =
        req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        return res
            .status(401)
            .json({ error: 'Unauthorized: No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId; // Set the user ID on the request object
        next();
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};

module.exports = auth;

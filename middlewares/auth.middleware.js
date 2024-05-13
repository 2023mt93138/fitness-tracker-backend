const jwt = require('jsonwebtoken');
const consts = require('../static/constants');

// Middleware function to authenticate JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Missing token' });
    }

    // Verify JWT token
    jwt.verify(token, consts.JWT_SECRET, (err, user) => {
        if (err) {
            console.error('Error verifying token:', err);
            return res.status(403).json({ error: 'Forbidden: Invalid token' });
        }
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
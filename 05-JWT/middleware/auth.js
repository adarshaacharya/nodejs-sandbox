const jwt = require('jsonwebtoken');


module.exports = function (req, res, next) {
    const token = req.header('x-auth-token'); // get token from header in x-auth-header

    if(!token) return res.status(401).send('Access denied. No token provided');

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY); //throws decoded payload
        req.user = decoded; // assign token payload[_id, isAdmin] to req.user to access further
        next();
    } catch(err) {
        res.send('Invalid Token').status(400);
    }
}
const jwt = require('jsonwebtoken');
const {unauthenticatedEror} = require('../errors/unauthenticated');

const authenticationMiddleware = async(req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')) {
        throw new unauthenticatedEror('No token provided bro', 401);
    }

    const token = authHeader.split(' ')[1];

    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
        const {id, username} = decoded;
        req.user = {id, username}
        next();
    }
    catch(error) {
        throw new unauthenticatedEror('terko allowed nhi hai bro', 401);        
    }


}

module.exports = authenticationMiddleware;
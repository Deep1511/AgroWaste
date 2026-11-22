const jwt = require('jsonwebtoken');

function getJwtSecret() {
    if (process.env.JWT_SECRET) {
        return process.env.JWT_SECRET;
    }
    try {
        const config = require('config');
        if (config.has('jwtToken')) {
            return config.get('jwtToken');
        }
    } catch (e) {
        // config not loaded
    }
    return 'mytokenyoyoyo';
}

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: 'enter token' });
    }
    try {
        const decoded = jwt.verify(token, getJwtSecret());
        req.user = decoded.user;
        next();
    } catch (err) {
        return res.status(401).json({ msg: 'Wrong Token' });
    }
};

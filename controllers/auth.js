const jwt = require('jsonwebtoken');
exports.isUser = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.sendStatus(401);
    }
    jwt.verify(token, 'secret', (err, u) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = u;
        next();
    })
}
exports.isAdmin = (req, res, next) => {
    if (req.user.rolle == 'admin') {
        next()
    } else {
        res.sendStatus(403)
    }
}
exports.isEditor = (req, res, next) => {
    if (req.user.rolle == 'editor' || req.user.rolle == 'admin') {
        next()
    } else {
        res.sendStatus(403)
    }
}
const jwt = require("jsonwebtoken");

const authenticateToken = (req, resp, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token === null) {
        return resp.status(401).json({ message: "Authorization token required" });
    }

    jwt.verify(token, "zeeTM", (err, user) => {
        if (err) {
            return resp.status(400).json(err);
        }
        req.user = user;
        next();
    });
};

module.exports = { authenticateToken };

const jwt = require('jsonwebtoken');
// const asyncHandler = require('express-async-handler');

const authMiddleware = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.id
        req.body.id = userId;
        next();
    } catch (error) {
        res.status(401).send({
            message: "You Are not Authenticated",
            data: error,
            success: false
        })
        // throw new Error("You Are not Authenticated")
    }
};

module.exports = { authMiddleware };
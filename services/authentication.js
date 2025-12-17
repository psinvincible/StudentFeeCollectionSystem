const JWT = require("jsonwebtoken");

const createTokenForUser = (teacher) => {
    const payload = {
    _id: teacher._id,
    email: teacher.email,
    role: teacher.role,
    };
    const token = JWT.sign(payload, process.env.AUTH_SERVICE_SECRET);
    return {token, role:teacher.role};
}

const validateToken = (token) => {
    const payload = JWT.verify(token, process.env.AUTH_SERVICE_SECRET);
    return payload;
}

module.exports = {
    createTokenForUser, validateToken,
}

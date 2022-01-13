const jwt = require('jsonwebtoken');
const { jwtConfig } = require('./config');

const { secret, expiresIn } = jwtConfig;

const getUserToken = (user) => {
    const userDataForToken = {
        id: user.id,
        email: user.email,
    };

    const token = jwt.sign(
        { data: userDataForToken },
        secret,
        { expireIn: parseInt(expiresIn, 10) }
    );

    return token;
};

module.exports = { getUserToken };

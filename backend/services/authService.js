const jwt = require('jsonwebtoken')

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m'})
}

function generateRefreshToken(user) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d'})
}


// Проверка Access Token
function verifyAccessToken(token) {
    try {
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
        throw new Error('Invalid Access Token');
    }
}

// Проверка Refresh Token
function verifyRefreshToken(token) {
    try {
        return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
        console.error('JWT verification error:', err);
        throw new Error('Invalid Refresh Token');
    }
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
};

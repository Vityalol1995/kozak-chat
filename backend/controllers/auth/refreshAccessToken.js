const {verifyRefreshToken, generateAccessToken} = require("../../services/authService");
// const {getUserData} = require("../../services/userData");
const refreshAccessToken = (req, res) => {
    const refreshToken = req.cookies.refreshToken; // Берем Refresh Token из cookies

    if (!refreshToken) {
        return res.status(401).json({ error: 'Refresh Token not found' });
    }

    try {
        // Проверяем Refresh Token
        const validRefreshToken = verifyRefreshToken(refreshToken);
        const newAccessToken = generateAccessToken({id: validRefreshToken.id, name: validRefreshToken.name });

        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 15 * 60 * 1000, // 15 мин
        });

        res.status(200).json({ message: 'Set new access token' });
    } catch (err) {
        return res.status(401).json({ error: 'Invalid Refresh Token' });
    }
};

module.exports = {
    refreshAccessToken
};


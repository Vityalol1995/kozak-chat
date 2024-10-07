const { verifyAccessToken } = require('../services/authService');
const {refreshAccessToken} = require("../controllers/auth/refreshAccessToken");

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) {
        try {
            await refreshAccessToken()
        } catch (e) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }
    }

    try {
        const decoded = verifyAccessToken(token); // Проверка токена
        req.user = decoded; // Сохраняем данные пользователя для использования в других обработчиках
        next(); // Передаем выполнение дальше
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;

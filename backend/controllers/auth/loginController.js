const User = require('../../models/userModel');
const bcrypt = require('bcrypt');
const {generateAccessToken, generateRefreshToken} = require("../../services/authService");
const {getUserData} = require("../../services/userData");
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Поиск пользователя
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        // Проверка пароля
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        let userData = getUserData(user)

        // Генерация токенов
        const accessToken = generateAccessToken(userData);
        const refreshToken = generateRefreshToken(userData);

        // Сохраняем токены в cookies
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 15 * 60 * 1000, // 15 минут
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
        });

        res.status(200).json({ message: 'Logged in successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    login
}

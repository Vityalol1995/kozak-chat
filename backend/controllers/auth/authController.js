const User = require('../../models/userModel');
const bcrypt = require('bcrypt');
const {generateAccessToken, generateRefreshToken} = require("../../services/authService");
const {getUserData} = require("../../services/userData");

const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Проверка существующего пользователя
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Хэширование пароля
        const hashedPassword = await bcrypt.hash(password, 10);

        // Создание нового пользователя
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        const userData = getUserData(user)

        const accessToken = generateAccessToken(userData)
        const refreshToken = generateRefreshToken(userData);


        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 15 * 60 * 1000, // 15 мин
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
        });

        res.status(201).json({
            message: 'User registered successfully'
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    register
};

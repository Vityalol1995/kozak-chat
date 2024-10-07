const User = require('../models/userModel');

const getUser = async (req, res) => {
    console.log(req.user)
    try {
        // Используем userId, который был декодирован и сохранен в req.user мидлвеером
        const userId = req.user.id;

        console.log(userId, 'userId')
        // Получаем данные пользователя из базы данных по ID
        const user = await User.findById(userId).select('-password'); // исключаем пароль
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Отправляем данные пользователя
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getUser
};

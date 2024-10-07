const express = require('express');
const { register } = require('../controllers/auth/authController');
const { login } = require('../controllers/auth/loginController');
const { getUser } = require('../controllers/getUser');
const authMiddleware = require('../middleware/auth');
const { refreshAccessToken } = require("../controllers/auth/refreshAccessToken");

const router = express.Router();
// Регистрация пользователя
router.post('/register', register);

// Логин пользователя
router.post('/login', login);

// Обновление Access Token
router.post('/refresh-token', refreshAccessToken);

// Применяем authMiddleware ко всем остальным маршрутам
router.use(authMiddleware);

// Защищенный маршрут, доступный только для авторизованных пользователей
router.get('/user', getUser);

module.exports = router;

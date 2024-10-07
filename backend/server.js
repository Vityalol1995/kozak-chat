const express = require('express');
const cors = require('cors');
const connectDB = require('./config/dbConfig');
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();
const PORT = 3001;

// Подключение к базе данных
connectDB();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Замените на ваш фронтенд URL
    credentials: true,  // Добавляем эту строку для разрешения отправки куков
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
}));
app.use(express.json());
app.use(cookieParser());

// Использование маршрутов
app.use('/api', userRoutes);

app.use((err, req, res, next) => {
    console.error('Server Error:', err.stack);
    res.status(500).send('Something broke!');
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

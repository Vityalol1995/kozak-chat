import axios from 'axios';
import { updateToken } from "~/services/auth.js";

let is_token_refreshed = false;

const api = axios.create({
    baseURL: process.env.BASE_URL || 'http://localhost:3001',
    withCredentials: true, // Для отправки куки
});

// Интерсептор для ответов
api.interceptors.response.use(
    response => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            // Проверяем, не обновляется ли токен уже
            if (!is_token_refreshed) {
                is_token_refreshed = true; // Ставим флаг, чтобы предотвратить повторные обновления

                try {
                    // Попробуем обновить токен
                    const refreshResponse = await updateToken();

                    if (refreshResponse.status === 200) {
                        // Если токен успешно обновлен, пробуем снова выполнить исходный запрос
                        return api(error.config);
                    } else {
                        // Если обновление токена не удалось, перенаправляем на страницу аутентификации
                        window.location.href = '/auth';
                    }
                } catch (refreshError) {
                    // Если обновление токена не удалось, перенаправляем на страницу аутентификации
                    window.location.href = '/auth';
                } finally {
                    // Сбрасываем флаг через несколько секунд
                    setTimeout(() => {
                        is_token_refreshed = false;
                    }, 5000);
                }
            } else {
                // Если токен уже обновляется, просто отклоняем запрос с 401 ошибкой
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

export { api };
export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.provide('api', api);
});

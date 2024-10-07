import { useUserStore } from '~/store/user';
import { User } from "@/services/User.js"; // Функция для получения данных о пользователе

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (process.client) {
        const userStore = useUserStore();
        // Если у нас нет данных о пользователе в store, запрашиваем их с сервера
        if (!userStore.userData && !userStore.isLoading && to.path !== '/auth' && to.path !== '/login') {
            userStore.setLoading(true);
            try {
                const response = await User(); // Запрос к серверу для получения данных
                userStore.setUser(response.data); // Сохраняем данные в store
            } catch (error) {
                console.error("Ошибка получения данных пользователя", error);
            } finally {
                userStore.setLoading(false);
            }
        }
    }
});

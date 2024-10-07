import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
    let user = reactive({});
    let isLoading = ref(false)

    const setUser = (obj:object) => {
        Object.assign(user, obj);
    };

    const setLoading = (load:boolean) => {
        isLoading.value = load
    }

    const userData = computed(() => Object.keys(user).length > 0);

    return { user, setUser, userData, isLoading, setLoading };
});

import { api } from '~/plugins/axios';

export const Auth = (data) => {
    return api.post('/api/register', data)
}

export const updateToken = () => {
    return api.post('/api/refresh-token', {}, { withCredentials: true })
}

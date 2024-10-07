import { api } from '~/plugins/axios';

export const User = (data) => {
    return api.get('/api/user', data)
}

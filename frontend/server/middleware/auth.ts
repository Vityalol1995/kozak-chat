import { getCookie, sendRedirect } from 'h3';

export default defineEventHandler(async (event) => {

    if(process.server) {
        const accessToken = getCookie(event, 'accessToken');
        const refreshToken = getCookie(event, 'refreshToken');

        const { url } = event.req;

        if (!refreshToken && !accessToken && !url?.includes('/auth')) {
            return sendRedirect(event, '/auth');
        }

        if ((refreshToken || accessToken) && url?.includes('/auth')) {
            return sendRedirect(event, '/');
        }
    }
});

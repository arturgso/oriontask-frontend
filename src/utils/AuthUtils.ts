import Cookies from 'js-cookie';

export function getCookie(cookieName: string): string {
    const cookie = Cookies.get(cookieName);

    if (!cookie) throw Error('Requested cookie not found');
    return cookie;
}

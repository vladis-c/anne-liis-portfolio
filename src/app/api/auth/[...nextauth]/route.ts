import NextAuth from 'next-auth';
import authOptions from './authOptions';

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};
///https://medium.com/@rohitkumarkhatri/next-auth-in-app-router-of-next-js-7df037f7a2ad

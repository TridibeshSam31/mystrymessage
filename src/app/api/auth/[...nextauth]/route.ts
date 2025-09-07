import NextAuth from 'next-auth/next';
import { authOptions } from './options';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

//in nextjs API routes (especially with NextAuth), we need to handle both GET and POST requests for methods for authentication

//GET request are used for fetching session data , checking authentication status etc
//POST requests are used for actions like signing in , signing out or updating session data

//by exploring both you tell  next.js to use the same handler (NextAuth(authOptions) for both GET and POST requests to this route
//this is required for NextAuth to work correctly,as it needs to respond to both types of requests for authentification flows
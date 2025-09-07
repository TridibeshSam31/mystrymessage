import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/dashboard/:path*', '/sign-in', '/sign-up', '/', '/verify/:path*'],
};//config similar hai bilkul jaise hum  expres mai use krte the mtlb express mai bhi hjab hum dotenv config krte the to vo env file ka path leta tha humse
//idhar bhi vahi cheeje ho rhi hai yeh humse path le rha hai ki konsa route middlware se guzrega 
//humno jo /dashboard/:path* iska mtlb ki jo bhi hum dashboard ke baad likhenge middleware unn sab mai lgega similar virify/:path* ke saath bhi hai



export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // Redirect to dashboard if the user is already authenticated
  // and trying to access sign-in, sign-up, or home page
  if (
    token &&
    (url.pathname.startsWith('/sign-in') ||
      url.pathname.startsWith('/sign-up') ||
      url.pathname.startsWith('/verify') ||
      url.pathname === '/')
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!token && url.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

//now yeh middleware function kya kr rha hai aur iska purpose kya hai ??
//It controls access to certain routes based on whether the user is authenticated (has a valid token).
/*
How it works:

Get the token:
const token = await getToken({ req: request });
This checks if the user is logged in by trying to get their authentication token.

Get the requested URL:
const url = request.nextUrl;
This gets the URL the user is trying to access.

Redirect authenticated users away from public pages:
If the user is authenticated (token exists) and tries to visit /sign-in, /sign-up, /verify, or the home page (/),
they are redirected to /dashboard.
This prevents logged-in users from seeing login or signup pages.

Redirect unauthenticated users away from protected pages:
If the user is not authenticated (!token) and tries to visit /dashboard,
they are redirected to /sign-in.
This protects the dashboard from unauthenticated access.

Allow all other requests:
If none of the above conditions are met, the request continues as normal.

Summary:

Authenticated users can’t access login/signup/verify/home pages; they’re sent to the dashboard.
Unauthenticated users can’t access the dashboard; they’re sent to sign-in.
All other requests go through normally.








yeh sab next auth ki docs mai likha hua hai step wise format mai

*/



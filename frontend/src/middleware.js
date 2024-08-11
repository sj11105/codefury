// middleware.js
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  
  
  const protectedRoutes = ['/sms', '/safety', '/volunteer'];

  
  if (!token && protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/api/auth/signin', req.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: ['/sms', '/safety', '/volunteer'],
};

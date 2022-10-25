// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const config = {
  matcher: ['/checkout/:path*', '/auth/:path*', '/admin/:path*', '/((?!api/)/admin/:path.*)'],
};

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET }) as any;

  // Admin
  if (!session) {
    if (req.nextUrl.pathname.startsWith('/api/admin')) {
      return NextResponse.redirect(new URL('/api/auth/unauthorized', req.url));
    }

    const requestedPage = req.nextUrl.pathname;
    return NextResponse.redirect(new URL(`/auth/login?p=${requestedPage}`, req.url));
  }

  const validRoles = ['admin'];
  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!validRoles.includes(session.user.role)) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  if (req.nextUrl.pathname.startsWith('/api/admin')) {
    if (!validRoles.includes(session.user.role)) {
      return NextResponse.redirect(new URL('/api/auth/unauthorized', req.url));
    }
  }

  // Checkout
  if (req.url.includes('/checkout')) {
    const cart = req.cookies.get('cart');
    if (!session || cart === '[]') {
      const requestedPage = req.nextUrl.pathname;
      return NextResponse.redirect(new URL(`/auth/login?p=${requestedPage}`, req.url));
    }
    return NextResponse.next();
  }

  // Auth
  /*  if (req.nextUrl.pathname.startsWith('/auth')) {
    if (session) {
      return NextResponse.next();
    }
    return NextResponse.next();
  } */

  return NextResponse.next();
}

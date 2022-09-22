// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export const config = {
  matcher: '/checkout/:path*',
};

export async function middleware(req: NextRequest) {
  if (req.url.includes('/checkout')) {
    try {
      await jwtVerify(
        req.cookies.get('token') as string,
        new TextEncoder().encode(process.env.JWT_SECRET_SEED),
      );
      return NextResponse.next();
    } catch (error) {
      const { origin, pathname } = req.nextUrl;
      const url = `${origin}/auth/login?p=${pathname}`;

      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

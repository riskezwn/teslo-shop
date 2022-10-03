// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const config = {
  matcher: '/checkout/:path*',
};

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (req.url.includes('/checkout')) {
    if (!session) {
      const { origin, pathname } = req.nextUrl;
      const url = `${origin}/auth/login?p=${pathname}`;

      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

// export async function middleware(req: NextRequest) {
//   if (req.url.includes('/checkout')) {
//     try {
//       await jwtVerify(
//         req.cookies.get('token') as string,
//         new TextEncoder().encode(process.env.JWT_SECRET_SEED),
//       );
//       return NextResponse.next();
//     } catch (error) {
//       const { origin, pathname } = req.nextUrl;
//       const url = `${origin}/auth/login?p=${pathname}`;

//       return NextResponse.redirect(url);
//     }
//   }
//   return NextResponse.next();
// }

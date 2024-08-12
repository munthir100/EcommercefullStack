// middlware/auth.ts  
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function authMiddleware(request: NextRequest) {
    const url = request.nextUrl;
    const token = request.cookies.get('token');
    console.log('hello')
    if (token) {
        return NextResponse.redirect(new URL('/admin', request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/login', '/register'],
};
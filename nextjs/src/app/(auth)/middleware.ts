import { NextResponse } from 'next/server';

export function authMiddleware(req: any) {
    const token = req.cookies['token'];

    if (token) {
        return NextResponse.redirect(new URL('/admin', req.url));
    }

    return NextResponse.next();
}
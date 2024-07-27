import { NextResponse } from 'next/server';  
import type { NextRequest } from 'next/server';  

export function middleware(request: NextRequest) {  
  const url = request.nextUrl;  
  const token = request.cookies.get('token');  

  if (token) {  
    // Redirect to dashboard if user has token and tries to access login/register  
    if (url.pathname === '/admin/login' || url.pathname === '/admin/register') {  
      return NextResponse.redirect(new URL('/admin', request.url));  
    }  
    // Allow access to protected routes if user has token  
    return NextResponse.next();  
  }  
  // Redirect to login page if user doesn't have token  
  return NextResponse.redirect(new URL('/admin/login', request.url));  
}  

export const config = {  
  matcher: '/admin/:path*',  
};
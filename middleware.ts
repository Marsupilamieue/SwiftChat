import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await request.cookies.get('next-auth.session-token')?.value
  if(!!!token){
    return NextResponse.redirect(new URL('/auth', request.url))
  }
  return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/conversations/:path*'],
}
import { authMiddleware } from '@kinde-oss/kinde-auth-nextjs/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    return Response.redirect(new URL('/api/auth/login', request.url))
}

export const config = {
    matcher: ['/dashboard/:path*', '/auth-callback'],
}

export default authMiddleware
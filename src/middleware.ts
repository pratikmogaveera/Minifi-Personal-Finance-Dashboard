export { default } from '@kinde-oss/kinde-auth-nextjs/server'

export const config = {
    matcher: ['/dashboard/:path*', '/auth-callback'],
}

export const runtime = 'nodejs'

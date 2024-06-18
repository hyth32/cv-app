import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'
import {cookies} from 'next/headers'

export async function middleware(request: NextRequest) {
    const cookie = cookies()
    const token = cookie.get('token')

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

export const config = {
    matcher: ['/account', '/bookmarks', '/edit/:path*', '/companies', '/resumes', '/settings', '/vacancies', '/'],
}
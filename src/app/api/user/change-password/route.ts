import {NextRequest, NextResponse} from 'next/server'
import {sql} from '@vercel/postgres'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
    const login = req.nextUrl.searchParams.get('login')
    const {password, repeatedPassword} = await req.json()

    if (password && repeatedPassword && login) {
        if (password !== repeatedPassword) {
            return new NextResponse(JSON.stringify({error: true, message: 'PasswordMismatch'}))
        }
        try {
            const hashedPassword = await bcrypt.hash(password, 10)
            await sql`UPDATE users SET password=${hashedPassword} WHERE login=${login}`
            return new NextResponse(JSON.stringify({error: false}))
        } catch (error) {
            return new NextResponse(JSON.stringify({error: true, message: error}))
        }
    }
}
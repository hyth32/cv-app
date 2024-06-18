import {NextRequest, NextResponse} from 'next/server'
import {sql} from '@vercel/postgres'

export async function GET(req: NextRequest) {
    const login = req.nextUrl.searchParams.get('login')

    if (login) {
        try {
            const {rows} = await sql`SELECT * FROM users WHERE login=${login}`
            if (rows.length) {
                return new NextResponse(JSON.stringify({error: false, data: rows[0]}))
            }
            else {
                return new NextResponse(JSON.stringify({error: true, message: 'AccountDoesNotExist'}))
            }
        } catch (error) {
            return new NextResponse(JSON.stringify({error: true, message: error}))
        }
    }
}
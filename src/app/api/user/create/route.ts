import {NextRequest, NextResponse} from 'next/server'
import {sql} from '@vercel/postgres'
import jwt from 'jsonwebtoken'
import {cookies} from 'next/headers'

export async function POST(req: NextRequest) {
    const {login, password, type} = await req.json()

    try {
        const {rows} = await sql`SELECT * FROM users WHERE login=${login}`
        if (!rows.length) {
            await sql`INSERT INTO users (login, password, type) VALUES (${login}, ${password}, ${type})`
            const token = jwt.sign({login, password}, 'one-day-left')
            const cookie = cookies()
            cookie.set('token', token)
            return new NextResponse(JSON.stringify({error: false}))
        } else {
            return new NextResponse(JSON.stringify({error: true, message: 'AccountDoesAlreadyExist'}))
        }
    } catch (error) {
        return new NextResponse(JSON.stringify({error: true, message: error}))
    }
}
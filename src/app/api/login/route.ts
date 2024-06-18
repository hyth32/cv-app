import {NextRequest, NextResponse} from 'next/server'
import {sql} from '@vercel/postgres'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {cookies} from 'next/headers'

export async function POST(req: NextRequest) {
    const {login, password} = await req.json()
    const user = {login, password}

    try {
        const {rows} = await sql`SELECT * FROM users WHERE login=${login}`
        if (!rows.length) {
            return new NextResponse(JSON.stringify({error: true, message: 'AccountDoesNotExist'}))
        } else {
            const result = await new Promise((resolve, reject) => {
                bcrypt.compare(password, rows[0].password, (err, result) => {
                    if (err) reject(err)
                    else resolve(result)
                })
            })

            if (result) {
                const token = jwt.sign({login, password}, 'one-day-left')
                const cookie = cookies()
                cookie.set('token', token)
                return new NextResponse(JSON.stringify({error: false}))
            } else {
                return new NextResponse(JSON.stringify({error: true, message: 'PasswordDoNotMatch'}))
            }
        }
    } catch (error) {
        return new NextResponse(JSON.stringify({error: true, message: error}))
    }
}
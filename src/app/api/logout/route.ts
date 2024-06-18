import {NextResponse} from 'next/server'
import {cookies} from 'next/headers'

export async function GET() {
    try {
        const cookie = cookies()
        cookie.delete('token')
        return new NextResponse(JSON.stringify({error: false}))
    } catch (error) {
        return new NextResponse(JSON.stringify({error: true, message: error}))
    }
}
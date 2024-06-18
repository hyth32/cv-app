import {NextRequest, NextResponse} from 'next/server'
import {sql} from '@vercel/postgres'

export async function GET(req: NextRequest) {
    const id = req.nextUrl.searchParams.get('id')

    try {
        await sql`DELETE FROM vacancies WHERE id=${id}`
        return new NextResponse(JSON.stringify({error: false}))
    } catch (error) {
        return new NextResponse(JSON.stringify({error: true, message: error}))
    }
}
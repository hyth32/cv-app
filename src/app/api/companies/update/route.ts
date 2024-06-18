import {NextRequest, NextResponse} from 'next/server'
import {sql} from '@vercel/postgres'

export async function POST(req: NextRequest) {
    const id = req.nextUrl.searchParams.get('id')
    const {name, location, employerCount, image} = await req.json()

    if (id) {
        try {
            await sql`UPDATE companies SET name=${name}, location=${location}, employer_count=${employerCount}, image=${image} WHERE id=${id}`
            return new NextResponse(JSON.stringify({error: false}))
        } catch (error) {
            return new NextResponse(JSON.stringify({error: true, message: error}))
        }
    }
}
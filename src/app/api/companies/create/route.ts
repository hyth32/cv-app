import {NextRequest, NextResponse} from 'next/server'
import {sql} from '@vercel/postgres'

export async function POST(req: NextRequest) {
    const {ownerId, name, location, employerCount, image} = await req.json()
    try {
        await sql`INSERT INTO companies (owner_id, name, location, employer_count, image) VALUES (${ownerId}, ${name}, ${location}, ${employerCount}, ${image})`
        return new NextResponse(JSON.stringify({error: false, data: {ownerId, name, employerCount}}))

    } catch (error) {
        return new NextResponse(JSON.stringify({error: true, message: error}))
    }
}
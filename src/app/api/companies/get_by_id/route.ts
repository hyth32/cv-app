import {NextRequest, NextResponse} from 'next/server'
import {sql} from '@vercel/postgres'
import {Company} from '@/types/cards'

export async function GET(req: NextRequest) {
    const id = req.nextUrl.searchParams.get('id')

    if (id) {
        try {
            const {rows} = await sql`SELECT * FROM companies WHERE id=${id}`
            const data: Company[] = []
            rows.forEach(row => {
                data.push({
                    id: row.id,
                    owner: row.owner_id,
                    name: row.name,
                    location: row.location,
                    employerCount: row.employer_count,
                    type: row.type,
                    image: row.image,
                })
            })
            return new NextResponse(JSON.stringify({error: false, data: data}))
        } catch (error) {
            return new NextResponse(JSON.stringify({error: true, message: error}))
        }
    }
}
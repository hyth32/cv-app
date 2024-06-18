import {NextRequest, NextResponse} from 'next/server'
import {sql} from '@vercel/postgres'

export async function GET(req: NextRequest) {
    const id = req.nextUrl.searchParams.get('id')

    if (id) {
        try {
            const {rows} = await sql`SELECT * FROM salary WHERE id=${id}`
            const data = {
                id: rows[0].id,
                ownerId: rows[0].owner_id,
                salary: {
                    from: rows[0].salary_from,
                    to: rows[0].salary_to
                }
            }
            return new NextResponse(JSON.stringify({error: false, data: data}))
        } catch (error) {
            return new NextResponse(JSON.stringify({error: true, message: error}))
        }
    }
}
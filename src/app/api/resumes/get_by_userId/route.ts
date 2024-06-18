import {NextRequest, NextResponse} from 'next/server'
import {sql} from '@vercel/postgres'
import {Resume} from '@/types/cards'

export async function GET(req: NextRequest) {
    const userId = req.nextUrl.searchParams.get('userId')

    if (userId) {
        try {
            const {rows} = await sql`SELECT * FROM resumes WHERE owner_id=${userId}`
            const data: Resume[] = []
            rows.forEach(row => {
                data.push({
                    id: row.id,
                    owner: row.owner_id,
                    contacts: row.contact,
                    salary: row.salary,
                    stack: row.stack,
                    name: row.name,
                    type: row.type,
                    image: row.image
                })
            })
            return new NextResponse(JSON.stringify({error: false, data: data}))
        } catch (error) {
            return new NextResponse(JSON.stringify({error: true, message: error}))
        }
    }
}
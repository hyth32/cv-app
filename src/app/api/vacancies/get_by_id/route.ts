import {NextRequest, NextResponse} from 'next/server'
import {sql} from '@vercel/postgres'
import {Vacancy} from '@/types/cards'

export async function GET(req: NextRequest) {
    const id = req.nextUrl.searchParams.get('id')

    if (id) {
        try {
            const {rows} = await sql`SELECT * FROM vacancies WHERE id=${id}`
            const data: Vacancy[] = []
            rows.forEach(row => {
                data.push({
                    id: row.id,
                    owner: row.owner_id,
                    contacts: row.contact,
                    salary: row.salary,
                    name: row.name,
                    companyId: row.company_id,
                    type: row.type,
                    location: row.location
                })
            })
            return new NextResponse(JSON.stringify({error: false, data: data}))
        } catch (error) {
            return new NextResponse(JSON.stringify({error: true, message: error}))
        }
    }
}
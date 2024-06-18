import {NextRequest, NextResponse} from 'next/server'
import {sql} from '@vercel/postgres'
import {Vacancy} from '@/types/cards'

export async function GET(req: NextRequest) {
    const q = req.nextUrl.searchParams.get('q')
    try {
        const {rows} = await sql`SELECT * FROM vacancies`
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

        let currentData = data
        if (q) {
            currentData = data.filter(row => row.name.toLowerCase().includes(q.toLowerCase()))
        }
        return new NextResponse(JSON.stringify({error: false, data: currentData}))
    } catch (error) {
        return new NextResponse(JSON.stringify({error: true, message: error}))
    }
}
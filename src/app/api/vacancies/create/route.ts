import {NextRequest, NextResponse} from 'next/server'
import {sql} from '@vercel/postgres'

export async function POST(req: NextRequest) {
    const {ownerId, contacts, salary, name, companyId} = await req.json()

    try {
        await sql`WITH new_salary AS 
                    (INSERT INTO salary (owner_id, salary_from, salary_to) VALUES (${ownerId}, ${salary.from}, ${salary.to}) RETURNING id),
                      new_contact AS
                        (INSERT INTO contacts (owner_id, email, phone, links) VALUES (${ownerId}, ${contacts.email}, ${contacts.phone}, ${contacts.links}) RETURNING id)
                  INSERT INTO vacancies (owner_id, contact, salary, name, company_id) VALUES (${ownerId}, (SELECT id FROM new_contact), (SELECT id FROM new_salary), ${name}, ${companyId})
                  `
        return new NextResponse(JSON.stringify({error: false}))
    } catch (error) {
        return new NextResponse(JSON.stringify({error: true, message: error}))
    }
}
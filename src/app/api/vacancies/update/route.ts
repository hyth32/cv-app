import {NextRequest, NextResponse} from 'next/server'
import {sql} from '@vercel/postgres'

export async function POST(req: NextRequest) {
    const id = req.nextUrl.searchParams.get('id')
    const {contacts, salary, name, companyId, location} = await req.json()

    if (id) {
        try {
            await sql
                `
                    UPDATE vacancies
                    SET
                        name=COALESCE(${name}, name),
                        location=COALESCE(${location}, location),
                        company_id=COALESCE(${companyId}, company_id)
                    WHERE id=${id}
                `
            if (contacts) {
                await sql
                    `
                        UPDATE contacts
                            SET
                                email = COALESCE(${contacts.email}, email),
                                phone = COALESCE(${contacts.phone}, phone),
                                links = COALESCE(${contacts.links}, links)
                            WHERE id = (
                                SELECT contact FROM vacancies WHERE id = ${id}
                        );
                    `
            }
            if (salary) {
                await sql
                    `
                        UPDATE salary
                            SET
                                salary_from = COALESCE(${salary.from}, salary_from),
                                salary_to = COALESCE(${salary.to}, salary_to)
                            WHERE id = (
                                SELECT salary FROM vacancies WHERE id = ${id}
                        );

                    `
            }
            return new NextResponse(JSON.stringify({error: false}))
        } catch (error) {
            return new NextResponse(JSON.stringify({error: true, message: error}))
        }
    }
}
import {NextRequest, NextResponse} from 'next/server'
import {sql} from '@vercel/postgres'

export async function POST(req: NextRequest) {
    const id = req.nextUrl.searchParams.get('id')
    const {name, salary, contacts, stack, image} = await req.json()

    if (id) {
        try {
            await sql
                `
                    UPDATE resumes
                    SET
                        name=COALESCE(${name}, name),
                        stack=COALESCE(${stack}::text[], stack),
                        image=COALESCE(${image}, image)
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
                                SELECT contact FROM resumes WHERE id = ${id}
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
                                SELECT salary FROM resumes WHERE id = ${id}
                        );

                    `
            }
            return new NextResponse(JSON.stringify({error: false}))
        } catch (error) {
            return new NextResponse(JSON.stringify({error: true, message: error}))
        }
    }
}
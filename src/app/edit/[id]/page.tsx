'use client'
import React, {useEffect, useState} from 'react'
import EditableCard from '@/components/card/EditableCard'
import {redirect, usePathname, useSearchParams} from 'next/navigation'
import {getResumeById} from '@/app/api/resumes/get_by_id/getResumeById'
import {Company, Resume, Vacancy} from '@/types/cards'
import {getVacancyById} from '@/app/api/vacancies/get_by_id/getVacancyById'
import {getCompanyById} from '@/app/api/companies/get_by_id/getCompanyById'

export default function Page() {
    const [item, setItem] = useState<Resume | Vacancy | Company>({} as Resume | Vacancy | Company)
    const searchParams = useSearchParams()
    const type = searchParams.get('type')
    const pathname = usePathname()
    const id = pathname.split('/')[2]

    useEffect(() => {
        if (!type || !(type === 'resume' || type === 'vacancy' || type === 'company')) {
            redirect('/account')
        }

        if (type === 'resume') {
            const getItem = async () => {
                const respond = await getResumeById(Number(id))
                setItem(respond.data[0])
            }
            getItem()
        }
        if (type === 'vacancy') {
            const getItem = async () => {
                const respond = await getVacancyById(Number(id))
                setItem(respond.data[0])
            }
            getItem()
        }
        if (type === 'company') {
            const getItem = async () => {
                const respond = await getCompanyById(Number(id))
                setItem(respond.data[0])
            }
            getItem()
        }
    }, [id, type])

    return (
        <>
            <div className={'p-8 bg-white rounded-xl border w-full lg:w-2/3 mx-auto'}>
                {Object.keys(item).length > 0 && <EditableCard item={item}/>}
            </div>
        </>
    )
}
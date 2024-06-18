'use client'
import React, {useEffect, useState} from 'react'
import {Company, Resume, Vacancy} from '@/types/cards'
import Card from '@/components/card/Card'
import {
    createResumeCard,
    createVacancyCard,
    getUserCompany,
    getUserResumes,
    getUserVacancies
} from '@/utils/card/functions'
import {deleteVacancyById} from '@/app/api/vacancies/delete/deleteVacancyById'
import {deleteResumeById} from '@/app/api/resumes/delete/deleteResumeById'
import Button from '@/UI/Button'
import {useAccount} from '@/providers/AccountProvider'

export default function Cards({items, type, isDraft}: {
    items?: Vacancy[] | Resume[] | Company[],
    type?: string,
    isDraft?: boolean
}) {
    const [cards, setCards] = useState<Vacancy[] | Resume[] | Company[]>(items || [])
    const [company, setCompany] = useState<Company[]>([])
    const [login, setLogin] = useState('')
    const [isLoading, setLoading] = useState(false)
    const {accountType} = useAccount()

    useEffect(() => {
        const login = localStorage.getItem('login')
        if (login) {
            setLogin(login)

            if (isDraft) {
                if (accountType === 'hr') {
                    const setUserCompany = async () => {
                        const company = await getUserCompany(login)
                        setCompany(company)
                    }
                    setUserCompany()
                    const setUserVacancies = async () => {
                        const vacancies = await getUserVacancies(login)
                        setCards(vacancies)
                    }
                    setUserVacancies()
                } else {
                    const setUserResumes = async () => {
                        const resumes = await getUserResumes(login)
                        setCards(resumes)
                    }
                    setUserResumes()
                }
            }

        }
    }, [accountType, isDraft, type])


    const handleCreateCard = async (e: React.MouseEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            if (accountType === 'hr') {
                await createVacancyCard(login)
                const setUserVacancies = async () => {
                    const vacancies = await getUserVacancies(login)
                    setCards(vacancies)
                }
                setUserVacancies()
            } else {
                await createResumeCard(login)
                const setUserResumes = async () => {
                    const resumes = await getUserResumes(login)
                    setCards(resumes)
                }
                setUserResumes()
            }
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteCard = async (id: number) => {
        if (accountType === 'hr') {
            await deleteVacancyById(id)
            const setUserVacancies = async () => {
                const vacancies = await getUserVacancies(login)
                setCards(vacancies)
            }
            setUserVacancies()
        } else {
            await deleteResumeById(id)
            const setUserResumes = async () => {
                const resumes = await getUserResumes(login)
                setCards(resumes)
            }
            setUserResumes()
        }
    }

    return (
        <>
            {accountType === 'hr' && type === 'company' &&
                <>
                    {Object.keys(company).length > 0 && company.map(card => (
                        <Card key={card.id} isDraft={isDraft}
                              item={card}/>
                    ))}
                </>
            }
            {isDraft && type !== 'company' &&
                <Button disabled={isLoading} content={`${isLoading ? 'Подождите...' : '+'}`} addClassName={'h-full'}
                        onClick={(e) => handleCreateCard(e)}/>
            }
            {type !== 'company' && cards.map((card, index) => (
                <Card key={index} item={card} isDraft={isDraft} onDelete={() => handleDeleteCard(card.id)}/>
            ))}
        </>
    )
}


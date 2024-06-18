'use client'
import Grid from '@/UI/Grid'
import Title from '@/UI/Title'
import React, {useEffect, useState} from 'react'
import Cards from '@/components/Cards'
import {Vacancy} from '@/types/cards'
import {getAllVacancies} from '@/utils/card/functions'
import Text from '@/UI/Text'

export default function Page() {
    const [cards, setCards] = useState<Vacancy[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        try {
            const setAllVacancies = async () => {
                const vacancies = await getAllVacancies()
                setCards(vacancies)
            }
            setAllVacancies()
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }, [])

    return (
        <>
            <Title type={'h2'} content={'Вакансии'}/>
            <Grid>
                {Object.keys(cards).length > 0 && <Cards items={cards}/>}
                {loading && <div className="fixed inset-0 flex justify-center items-center">
                    <Text content={'Загрузка...'}/>
                </div>}
            </Grid>
        </>
    )
}
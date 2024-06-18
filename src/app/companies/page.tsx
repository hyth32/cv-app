'use client'
import Grid from '@/UI/Grid'
import Title from '@/UI/Title'
import Cards from '@/components/Cards'
import React, {useEffect, useState} from 'react'
import {Resume} from '@/types/cards'
import {getAllCompanies} from '@/utils/card/functions'
import Text from '@/UI/Text'

export default function Page() {
    const [cards, setCards] = useState<Resume[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        try {
            const setAllCompanies = async () => {
                const companies = await getAllCompanies()
                setCards(companies)
            }
            setAllCompanies()
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }, [])

    return (
        <>
            <Title type={'h2'} content={'Компании'}/>
            <Grid>
                {Object.keys(cards).length > 0 && <Cards items={cards}/>}
                {loading && <div className="fixed inset-0 flex justify-center items-center">
                    <Text content={'Загрузка...'}/>
                </div>}
            </Grid>
        </>
    )
}
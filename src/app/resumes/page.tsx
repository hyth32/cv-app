'use client'
import Grid from '@/UI/Grid'
import Title from '@/UI/Title'
import React, {useEffect, useState} from 'react'
import Cards from '@/components/Cards'
import {Resume} from '@/types/cards'
import {getAllResumes} from '@/utils/card/functions'
import Text from '@/UI/Text'

export default function Page() {
    const [cards, setCards] = useState<Resume[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        try {
            const setAllResumes = async () => {
                const resumes = await getAllResumes()
                setCards(resumes)
            }
            setAllResumes()
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }, [])

    return (
        <>
            <Title type={'h2'} content={'Резюме'}/>
            <Grid>
                {Object.keys(cards).length > 0 && <Cards items={cards}/>}
                {loading && <div className="fixed inset-0 flex justify-center items-center">
                    <Text content={'Загрузка...'}/>
                </div>}
            </Grid>
        </>
    )
}
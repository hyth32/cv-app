'use client'

import React, {useState} from 'react'
import Form from '@/UI/Form'
import Input from '@/UI/Input'
import {getVacanciesBySearch} from '@/app/api/vacancies/getVacancies'

export default function SearchBar({onSearch}: { onSearch?: (value: any[]) => void }) {
    const [search, setSearch] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const cards = await getVacanciesBySearch(search)
        onSearch && onSearch(cards.data)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Input type={'text'} placeholder={'Search...'} addClassName={'w-60'} value={search}
                   onChange={(e) => setSearch(e.target.value)}/>
        </Form>
    )
}
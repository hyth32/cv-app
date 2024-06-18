'use client'
import Title from '@/UI/Title'
import React, {useEffect, useState} from 'react'
import Input from '@/UI/Input'
import Form from '@/UI/Form'
import Button from '@/UI/Button'
import {changePassword} from '@/app/api/user/change-password/changePassword'

export default function Page() {
    const [login, setLogin] = useState<string | null>(null)
    const [newPassword, setNewPassword] = useState<string>('')
    const [repeatedPassword, setRepeatedPassword] = useState<string>('')

    useEffect(() => {
        const loginFromStorage = localStorage.getItem('login')
        if (loginFromStorage) {
            setLogin(loginFromStorage)
        }
    }, [])

    const handleChangePassword = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (login) {
            const response = await changePassword(login, newPassword, repeatedPassword)
            const {error, message} = response
            if (!error) {
                console.log('Пароль успешно измененее')
            } else {
                console.log(`Произошла ошибка: ${message}`)
            }
        }
    }

    return (
        <>
            <Form addClassName={'p-8 bg-white rounded-xl border w-full lg:w-1/3 mx-auto flex flex-col items-center'}>
                <Title type={'h3'} content={'Смена пароля'} addClassName={'mb-4'}/>
                <Input type={'password'}
                       autoComplete={'off'}
                       addClassName={'w-full'}
                       placeholder={'Новый пароль'}
                       onChange={(e) => setNewPassword(e.target.value)}
                />
                <Input type={'password'}
                       autoComplete={'off'}
                       addClassName={'w-full'}
                       placeholder={'Повторите новый пароль'}
                       onChange={(e) => setRepeatedPassword(e.target.value)}
                />
                <Button content={'Сохранить'} onClick={e => handleChangePassword(e)} addClassName={'w-full mt-4'}/>
            </Form>
        </>
    )
}
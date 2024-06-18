'use client'
import React, {useLayoutEffect, useState} from 'react'
import Title from '@/UI/Title'
import Input from '@/UI/Input'
import Button from '@/UI/Button'
import Form from '@/UI/Form'
import Link from 'next/link'
import Text from '@/UI/Text'
import {setUserLogin} from '@/app/api/login/setUserLogin'
import {redirect} from 'next/navigation'

export default function LoginPage() {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setLoading] = useState(false)
    const [loginError, setLoginError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    useLayoutEffect(() => {
        const login = localStorage.getItem('login')

        if (login) {
            redirect('/account')
        }
    }, [])

    const getErrorText = (message: string) => {
        if (message === 'AccountDoesNotExist' || message === 'PasswordDoNotMatch') {
            setError('Неверное имя пользователя или пароль')
        } else {
            setError('Неизвестная ошибка')
        }
    }

    const loginRegex = /^[a-zA-Z0-9-]{3,20}$/g
    const passwordRegex = /^[a-zA-Z0-9!@#%^&*()_+{}|:"?\-=;',.\/]{3,100}$/g

    const validateLogin = (input: string) => {
        if (!loginRegex.test(input)) {
            setLoginError('Логин должен содержать от 3 до 20 символов и может содержать только буквы, цифры и дефисы')
        } else {
            setLoginError('')
        }
    }

    const validatePassword = (input: string) => {
        if (!passwordRegex.test(input)) {
            setPasswordError('Пароль должен содержать от 3 до 100 символов и может содержать только буквы, цифры и определенные символы')
        } else {
            setPasswordError('')
        }
    }

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\s/g, '')
        setLogin(value)
        validateLogin(value)
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\s/g, '')
        setPassword(value)
        validatePassword(value)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await setUserLogin(login, password)
            const {error, message} = response
            if (error) {
                getErrorText(message)
            } else {
                localStorage.setItem('login', login)
                window.location.href = '/account'
            }
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={'flex flex-col items-center pt-36'}>
            <Title type={'h2'} content={'Вход'}/>
            <Form onSubmit={handleSubmit} addClassName={'w-4/5 md:w-3/5 lg:w-80'}>
                <Input type="login"
                       placeholder="Логин"
                       value={login}
                       pattern="[^\s]+"
                       onChange={handleLoginChange}/>
                <Input type="password"
                       placeholder="Пароль"
                       value={password}
                       pattern="[^\s]+"
                       onChange={handlePasswordChange}/>
                {(login || password) && (error || loginError || passwordError) &&
                    <Text content={error || loginError || passwordError}
                          addClassName={'text-sm text-red-400 text-center'}/>}
                <Button type="submit"
                        disabled={isLoading || !!loginError || !!passwordError}
                        addClassName={'mt-2'}
                        content={isLoading ? 'Подождите...' : 'Войти'}/>
            </Form>
            <Text content={'или'} addClassName={'my-4 text-zinc-400 text-sm'}/>
            <Link
                className={'text-sm flex items-center rounded-lg cursor-pointer text-center hover:underline transition-all'}
                href={'/auth'}
            >
                Зарегистрироваться
            </Link>
        </div>
    )
}
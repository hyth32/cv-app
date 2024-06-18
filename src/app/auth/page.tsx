'use client'
import React, {useLayoutEffect, useState} from 'react'
import Title from '@/UI/Title'
import Input from '@/UI/Input'
import Button from '@/UI/Button'
import Form from '@/UI/Form'
import Link from 'next/link'
import Text from '@/UI/Text'
import {createUser} from '@/app/api/user/create/createUser'
import {getUser} from '@/app/api/user/getUser'
import {createCompany} from '@/app/api/companies/create/createCompany'
import {redirect} from 'next/navigation'

export default function RegisterPage() {
    const [type, setType] = useState<'employee' | 'hr'>('employee')
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

    const handleCheckboxChange = () => {
        setType(t => (t === 'employee' ? 'hr' : 'employee'))
    }

    const getErrorText = (message: string) => {
        if (message === 'AccountDoesAlreadyExist') {
            setError('Пользователь уже существует')
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
            const user = {type, login, password}
            const createdUser = await createUser(user)
            const {error, message} = createdUser
            if (!error) {
                localStorage.setItem('login', login)
                const response = await getUser(login)
                const {error, message, data} = response
                if (!error) {
                    const newCompany = {
                        ownerId: data.id,
                        name: 'Моя компания',
                        location: 'Неизвестно',
                        employerCount: 0
                    }
                    const response = await createCompany(newCompany)
                    const {error, message} = response
                    if (error) {
                        console.error(message)
                    } else {
                        window.location.reload()
                    }
                } else console.error(message)
            } else getErrorText(message)
        } catch (err) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={'flex flex-col items-center pt-36'}>
            <Title type={'h2'} content={'Регистрация'}/>
            <Form onSubmit={handleSubmit} addClassName={'w-4/5 md:w-3/5 lg:w-80'}>
                <Input type="login"
                       placeholder="Логин"
                       value={login}
                       addClassName={'min-w-full'}
                       onChange={handleLoginChange}/>
                <Input type="password"
                       placeholder="Пароль"
                       value={password}
                       onChange={handlePasswordChange}/>
                <div className={'flex gap-2 items-center mt-2'}>
                    <Input type={'checkbox'}
                           name={'companyCheckbox'}
                           checked={type !== 'employee'}
                           onChange={handleCheckboxChange}
                           addClassName={'accent-zinc-900 w-4 h-4'}/>
                    <label htmlFor={'companyCheckbox'} className={'flex gap-2 items-center text-sm text-zinc-500'}>Я
                        представитель компании</label>
                </div>
                {(login || password) && (error || loginError || passwordError) &&
                    <Text content={error || loginError || passwordError}
                          addClassName={'text-sm text-red-400 text-center'}/>}
                <Button type="submit"
                        disabled={isLoading || !!loginError || !!passwordError}
                        addClassName={'mt-2'}
                        content={isLoading ? 'Подождите...' : 'Зарегистрироваться'}
                />
            </Form>
            <div className={'flex gap-2'}>
                <Text content={'Уже есть аккаунт?'} addClassName={'my-4 text-zinc-400 text-sm'}/>
                <Link
                    className={'text-sm flex items-center rounded-lg cursor-pointer text-center hover:underline transition-all'}
                    href={'/login'}
                >
                    Войти
                </Link>
            </div>
        </div>
    )
}
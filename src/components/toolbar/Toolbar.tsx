'use client'
import Link from 'next/link'
import Button from '@/UI/Button'
import styles from './Toolbar.module.css'
import {useState} from 'react'
import {useAccount} from '@/providers/AccountProvider'
import axios from 'axios'
import {setLogout} from '@/app/api/logout/setLogout'

type ToolbarItem = {
    href: string,
    name: string,
}

const items: ToolbarItem[] = [
    {href: '/bookmarks', name: 'Закладки'},
    {href: '/settings', name: 'Настройки'},
    {href: '/account', name: 'Аккаунт'}
]

const employeeItems: ToolbarItem[] = [
    {href: '/resumes', name: 'Резюме'}
]

const hrItems: ToolbarItem[] = [
    {href: '/vacancies', name: 'Вакансии'},
    {href: '/companies', name: 'Компании'},
]

export default function Toolbar() {
    const {accountType} = useAccount()
    const toolbarItems = accountType === 'employee' ? [...hrItems, ...items] : [...employeeItems, ...items]
    const [isHidden, setHidden] = useState(true)

    const handleLogout = async () => {
        const response = await setLogout()
        const {error, message} = response
        if (!error) {
            localStorage.removeItem('login')
            window.location.reload()
        }
    }

    return (
        <>
            {!isHidden && <div className={`h-screen w-screen z-10 top-0 left-0 bg-white fixed md:hidden`}></div>}
            <Button content={'≡'}
                    onClick={() => setHidden(!isHidden)}
                    overlap={true} addClassName={`md:hidden text-3xl relative z-10`}/>
            <div
                className={`${isHidden ? 'hidden' : ''} text-right absolute z-10 right-4 top-[12%] flex flex-col items-end md:flex md:flex-row gap-3 md:static`}>
                {toolbarItems.map(({href, name}: ToolbarItem) => (
                    <Link key={name} href={href} title={name} onClick={() => setHidden(!isHidden)}
                          className={`hover:bg-zinc-100 ${styles.toolbarItem}`}>
                        {name}
                    </Link>
                ))}
                <Button content={'Выйти'}
                        onClick={handleLogout}
                        overlap={true}
                        addClassName={`hover:bg-zinc-700 hover:text-white text-right md:text-center ${styles.toolbarItem}`}/>
            </div>
        </>
    )
}
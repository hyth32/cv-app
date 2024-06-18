'use client'
import React, {createContext, useContext, useEffect, useState} from 'react'
import {getUser} from '@/app/api/user/getUser'

type AccountType = 'employee' | 'hr'
type AccountContextType = {
    accountType: AccountType,
    setAccountType: (type: AccountType) => void
}
const AccountContext = createContext<AccountContextType | undefined>(undefined)

export const useAccount = () => {
    const context = useContext(AccountContext)
    if (!context) {
        throw new Error('useAccount must be used within an AccountProvider')
    }
    return context
}

export const AccountProvider = ({children}: { children: React.ReactNode }) => {
    const [accountType, setAccountType] = useState<AccountType>('employee')

    useEffect(() => {
        const login = localStorage.getItem('login')
        if (login) {
            const getType = async () => {
                const response = await getUser(login)
                const {error, data} = response
                if (!error) {
                    setAccountType(data.type)
                }
            }
            getType()
        }
    }, [])

    return (
        <AccountContext.Provider value={{accountType, setAccountType}}>
            {children}
        </AccountContext.Provider>
    )
}
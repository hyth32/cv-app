import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import React from 'react'
import Container from '@/UI/Container'
import Header from '@/components/Header'
import {AccountProvider} from '@/providers/AccountProvider'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app'
}

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <section>
            <AccountProvider>
                <Header/>
                <Container>
                    <main>
                        {children}
                    </main>
                </Container>
            </AccountProvider>
        </section>
        </body>
        </html>
    )
}

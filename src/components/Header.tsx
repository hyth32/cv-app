'use client'
import Toolbar from '@/components/toolbar/Toolbar'
import Title from '@/UI/Title'
import {usePathname} from 'next/navigation'

export default function Header() {
    const pathname = usePathname()
    const isAuthPage = pathname === '/login' || pathname === '/auth'

    return (
        !isAuthPage &&
        <div className={'bg-white border border-[#D9DEE3] px-6 py-4 flex items-center justify-between'}>
            <Title content={'CV'} addClassName={'relative z-20'}/>
            <Toolbar/>
        </div>
    )
}
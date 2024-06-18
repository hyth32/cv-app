'use client'
import React, {useEffect, useState} from 'react'
import styles from './Card.module.css'
import Modal from '@/components/modal/Modal'
import Salary from '@/components/Salary'
import Stack from '@/components/Stack'
import Title from '@/UI/Title'
import Location from '@/components/Location'
import Contacts from '@/components/Contacts'
import Text from '@/UI/Text'
import CloseButton from '@/UI/CloseButton'
import {Company, Resume, Vacancy} from '@/types/cards'
import {getSalaryById} from '@/app/api/salary/getSalaryById'
import {Salary as SalaryType} from '@/types/cards'
import {getContactsById} from '@/app/api/contacts/getContactsById'
import {useRouter} from 'next/navigation'
import ImageView from "@/components/image/ImageView";

export default function Card({item, isDraft, onDelete}: {
    item: Resume | Vacancy | Company,
    isDraft?: boolean,
    onDelete?: (id: number) => void
}) {
    const router = useRouter()
    const [isHovered, setHovered] = useState(false)
    const [isModalOpened, setModalOpened] = useState(false)
    const [salary, setSalary] = useState<SalaryType>({} as SalaryType)
    const [contacts, setContacts] = useState({})

    let card = <></>
    let modalCard = <></>

    useEffect(() => {
        if (item.type !== 'company') {
            const getSalary = async () => {
                const salaryId = Number((item as Vacancy | Resume).salary)
                const response = await getSalaryById(salaryId)
                setSalary(response.data.salary)
            }
            getSalary()
            const getContacts = async () => {
                const contactsId = Number((item as Vacancy | Resume).contacts)
                const response = await getContactsById(contactsId)
                setContacts(response.data)
            }
            getContacts()
        }
    }, [item])

    if (item.type === 'vacancy') {
        card =
            <div className={styles.cardContent}>
                <Title type={'h3'} content={item.name}/>
                {Object.keys(salary).length > 0 && <Salary salary={salary}/>}
                <Location location={(item as Vacancy).location}/>
            </div>
        modalCard =
            <>
                <Title type={'h2'} content={item.name}/>
                <Salary isModal={true} salary={salary}/>
                <Location isModal={true} location={(item as Vacancy).location}/>
                <Contacts contacts={contacts}/>
            </>
    }

    if (item.type === 'company') {
        card =
            <div className={styles.cardContent}>
                <div className={'flex gap-4'}>
                    <ImageView image={(item as Resume).image ?? ''}/>
                    <div>
                        <Title type={'h3'} content={item.name}/>
                        <Text content={`${(item as Company).employerCount > 0 ? `Сотрудников: ${(item as Company).employerCount}` : 'Не указано'}`}/>
                    </div>
                </div>
                <Location location={(item as Company).location}/>
            </div>
        modalCard =
            <>
                <ImageView image={(item as Resume).image ?? ''} size={'size-40'}/>
                <Title type={'h2'} content={item.name} addClassName={'mt-4'}/>
                <Title type={'h3'} content={'Количество сотрудников'}/>
                <Text
                    content={`${(item as Company).employerCount > 0 ? `${(item as Company).employerCount}` : 'Не указано'}`}/>
                <Location isModal={true} location={(item as Company).location}/>
            </>
    }

    if (item.type === 'resume') {
        card =
            <div className={styles.cardContent}>
                <div className={'flex gap-4'}>
                    <ImageView image={(item as Resume).image ?? ''}/>
                    <div className={'flex flex-col items-start gap-1 flex-wrap'}>
                        <Title type={'h3'} content={item.name}/>
                        {Object.keys(salary).length > 0 && <Salary salary={salary}/>}
                        {(item as Resume).stack.length > 0 ?
                            <Stack stack={(item as Resume).stack}/>
                            : <Text content={'Не указано'}
                                    addClassName={'items-start px-2 py-1 bg-zinc-600 rounded-md text-white font-medium'}/>}
                    </div>
                </div>
            </div>
        modalCard =
            <>
                <ImageView image={(item as Resume).image ?? ''} size={'size-40'}/>
                <Title type={'h2'} content={item.name} addClassName={'mt-4'}/>
                <Salary isModal={true} salary={salary}/>
                <Stack isModal={true} stack={(item as Resume).stack}/>
                <Contacts contacts={contacts}/>
            </>
    }

    return (
        <>
            {isModalOpened && !isDraft &&
                <Modal onClose={() => setModalOpened(false)}>
                    {modalCard}
                </Modal>
            }
            <div className={styles.card}
                 onMouseEnter={() => setHovered(true)}
                 onMouseLeave={() => setHovered(false)}
            >
                {isHovered && isDraft && item.type !== 'company' &&
                    <CloseButton onClose={() => onDelete && onDelete(0)}/>
                }
                <div onClick={() => isDraft ? router.push(`/edit/${item.id}?type=${item.type}`) : setModalOpened(true)}>
                    {card}
                </div>
            </div>
        </>
    )
}
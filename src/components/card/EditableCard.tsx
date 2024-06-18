import Title from '@/UI/Title'
import Input from '@/UI/Input'
import {MultiSelect, Option} from 'react-multi-select-component'
import Stack from '@/components/Stack'
import Button from '@/UI/Button'
import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import stackItems from '../../data/stackItems.json'
import locationItemsJson from '../../data/locationItems.json'
import {Company, Contacts, Resume, Salary, Salary as SalaryType, Vacancy} from "@/types/cards";
import {getSalaryById} from "@/app/api/salary/getSalaryById";
import {getContactsById} from "@/app/api/contacts/getContactsById";
import {updateResume} from "@/app/api/resumes/update/updateResume";
import {updateVacancy} from "@/app/api/vacancies/update/updateVacancy";
import {getCompanyById} from "@/app/api/companies/get_by_id/getCompanyById";
import {updateCompany} from "@/app/api/companies/update/updateCompany";
import Text from "@/UI/Text";
import ImageUpload from "@/components/image/ImageUpload";

const locationItemsString = JSON.stringify(locationItemsJson)

export default function EditableCard({item}: { item: Resume | Vacancy | Company }) {
    const [name, setName] = useState(item.name)
    const [salary, setSalary] = useState<Salary>({} as SalaryType)
    const [contacts, setContacts] = useState<Contacts>({} as Contacts)
    const [companyName, setCompanyName] = useState('')
    const [companyLoaded, setCompanyLoaded] = useState(false)
    const [employerCount, setEmployerCount] = useState((item as Company).employerCount)
    const [isSaving, setSaving] = useState(false)
    const [isSavingSucceeded, setSavingSucceeded] = useState(false)
    const [image, setImage] = useState<string>((item as Resume).image ?? '')

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
        } else {
            const getCompanyName = async () => {
                const response = await getCompanyById((item as Company).id)
                setCompanyName(response.data[0].name)
                setCompanyLoaded(true)
            }
            getCompanyName()
        }

    }, [item])

    const locationItems = JSON.parse(locationItemsString)
    const [selectedStack, setSelectedStack] = useState<Option[]>([])

    const [selectedLocation, setSelectedLocation] = useState<Option[]>([])
    const selectedStackItems: string[] = []
    selectedStack.forEach(item => selectedStackItems.push(item.label))

    if (selectedLocation.length > 0) {
        const selected = selectedLocation[0]
        locationItems.forEach((item: Option) => {
            if (item.value !== selected.value) {
                item.disabled = true
            }
        })
    }

    useEffect(() => {
        if (item.type === 'resume') {
            const stack = (item as Resume).stack
            if (stack.length > 0) {
                for (let i = 0; i < stack.length; i++) {
                    for (let j = 0; j < stackItems.length; j++) {
                        if (stack[i] === stackItems[j].label) {
                            selectedStack.push({label: stack[i], value: stack[i]})
                            stack.splice(i, 1)
                        }
                    }
                }
            }
        } else {
            const location = (item as Vacancy | Company).location
            if (location !== '') {
                for (let i = 0; i < locationItems.length; i++) {
                    if (location === locationItems[i].label) {
                        selectedLocation[0] = ({label: location, value: location})
                    }
                }
            }
        }
    }, [])
    const handleSubmit = async () => {
        setSaving(true)
        try {
            if (item.type === 'resume') {
                const updatedResume = {
                    id: item.id,
                    name: name,
                    salary: salary,
                    contacts: contacts,
                    stack: selectedStackItems,
                    image: image
                }
                await updateResume(updatedResume)
                setSavingSucceeded(true)
                setTimeout(() => {
                    setSavingSucceeded(false)
                }, 1500)
            }
            if (item.type === 'vacancy') {
                const updatedVacancy = {
                    id: item.id,
                    companyId: (item as Vacancy).companyId,
                    name: name,
                    salary: salary,
                    contacts: contacts,
                    location: selectedLocation[0].label,
                    image: image
                }
                await updateVacancy(updatedVacancy)
                setSavingSucceeded(true)
                setTimeout(() => {
                    setSavingSucceeded(false)
                }, 1500)
            }
            if (item.type === 'company') {
                const updatedCompany = {
                    id: item.id,
                    name: companyName,
                    location: selectedLocation[0].label,
                    employerCount: employerCount,
                    image: image
                }
                await updateCompany(updatedCompany)
                setSavingSucceeded(true)
                setTimeout(() => {
                    setSavingSucceeded(false)
                }, 1500)
            }
        } catch (err) {
            console.log(err)
            setSavingSucceeded(false)
        } finally {
            setSaving(false)
        }
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    setImage(reader.result)
                }
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <>
            {item.type === 'resume' &&
                <>
                    <ImageUpload image={image} handleChange={handleImageChange}/>
                    <Title type={'h3'} content={'Должность'} addClassName={'mb-2 mt-4'}/>
                    <Input type={'text'}
                           autoComplete={'off'}
                           addClassName={'w-full md:w-2/3'}
                           placeholder={'Должность'}
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                    />
                    <Title type={'h3'} content={'Зарплата'} addClassName={'mb-2 mt-4'}/>
                    {Object.keys(salary).length > 0 && <div className={'flex gap-4'}>
                        <Input type={'number'}
                               autoComplete={'off'}
                               addClassName={'w-1/2 md:w-36'}
                               placeholder={'от'}
                               value={salary.from}
                               onChange={(e) => setSalary(s => ({...s, from: parseInt(e.target.value)}))}
                        />
                        <Input type={'number'}
                               autoComplete={'off'}
                               addClassName={'w-1/2 md:w-36'}
                               placeholder={'до'}
                               value={salary.to}
                               onChange={(e) => setSalary(s => ({...s, to: parseInt(e.target.value)}))}
                        />
                    </div>}
                    <Title type={'h3'} content={'Стек'} addClassName={'mb-2 mt-4'}/>
                    <MultiSelect
                        options={stackItems}
                        value={selectedStack}
                        onChange={setSelectedStack}
                        labelledBy="Select"
                        hasSelectAll={false}
                        isCreatable={true}
                        overrideStrings={{'selectSomeItems': 'Выберите'}}
                        className={'w-full md:w-2/3 mb-3'}
                    />
                    <Stack stack={selectedStackItems} isDraft={true}/>
                    <Title type={'h3'} content={'Контакты'} addClassName={'mb-2 mt-4'}/>
                    {Object.keys(contacts).length > 0 && <div className={'flex flex-col gap-4'}>
                        <Input type={'phone'}
                               autoComplete={'off'}
                               addClassName={'w-full md:w-2/3'}
                               placeholder={'Телефон'}
                               value={contacts.phone}
                               onChange={(e) => setContacts(c => ({...c, phone: e.target.value}))}
                        />
                        <Input type={'email'}
                               autoComplete={'off'}
                               addClassName={'w-full md:w-2/3'}
                               placeholder={'Email'}
                               value={contacts.email}
                               onChange={(e) => setContacts(c => ({...c, email: e.target.value}))}
                        />
                    </div>}
                </>
            }
            {item.type === 'vacancy' &&
                <>
                    <Title type={'h3'} content={'Должность'} addClassName={'mb-2'}/>
                    <Input type={'text'}
                           autoComplete={'off'}
                           placeholder={'Должность'}
                           addClassName={'w-full md:w-2/3'}
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                    />
                    <Title type={'h3'} content={'Зарплата'} addClassName={'mb-2 mt-4'}/>
                    {Object.keys(salary).length > 0 && <div className={'flex gap-4'}>
                        <Input type={'number'}
                               autoComplete={'off'}
                               addClassName={'w-1/2 md:w-36'}
                               placeholder={'от'}
                               value={salary.from}
                               onChange={(e) => setSalary(s => ({...s, from: parseInt(e.target.value)}))}
                        />
                        <Input type={'number'}
                               autoComplete={'off'}
                               addClassName={'w-1/2 md:w-36'}
                               placeholder={'до'}
                               value={salary.to}
                               onChange={(e) => setSalary(s => ({...s, to: parseInt(e.target.value)}))}
                        />
                    </div>}
                    <Title type={'h3'} content={'Местоположение'} addClassName={'mb-2 mt-4'}/>
                    <MultiSelect
                        options={locationItems}
                        value={selectedLocation}
                        onChange={setSelectedLocation}
                        labelledBy="Select"
                        hasSelectAll={false}
                        overrideStrings={{'selectSomeItems': 'Выберите'}}
                        className={'w-full md:w-1/3'}
                    />
                    <Title type={'h3'} content={'Контакты'} addClassName={'mb-2 mt-4'}/>
                    {Object.keys(contacts).length > 0 && <div className={'flex flex-col gap-4'}>
                        <Input type={'phone'}
                               autoComplete={'off'}
                               addClassName={'w-full md:w-2/3'}
                               placeholder={'Телефон'}
                               value={contacts.phone}
                               onChange={(e) => setContacts(c => ({...c, phone: e.target.value}))}
                        />
                        <Input type={'email'}
                               autoComplete={'off'}
                               addClassName={'w-full md:w-2/3'}
                               placeholder={'Email'}
                               value={contacts.email}
                               onChange={(e) => setContacts(c => ({...c, email: e.target.value}))}
                        />
                    </div>}
                </>
            }
            {item.type === 'company' &&
                <>
                    <ImageUpload image={image} handleChange={handleImageChange}/>
                    <Title type={'h3'} content={'Компания'} addClassName={'mb-2 mt-4'}/>
                    {companyLoaded &&
                        <Input type={'text'}
                               autoComplete={'off'}
                               placeholder={'Компания'}
                               addClassName={'w-full md:w-2/3'}
                               value={companyName}
                               onChange={(e) => setCompanyName(e.target.value)}
                        />
                    }
                    <Title type={'h3'} content={'Местоположение'} addClassName={'mb-2 mt-4'}/>
                    <MultiSelect
                        options={locationItems}
                        value={selectedLocation}
                        onChange={setSelectedLocation}
                        labelledBy="Select"
                        hasSelectAll={false}
                        overrideStrings={{'selectSomeItems': 'Выберите'}}
                        className={'w-full md:w-1/3'}
                    />
                    <Title type={'h3'} content={'Количество сотрудников'} addClassName={'mb-2 mt-4'}/>
                    <Input type={'number'}
                           autoComplete={'off'}
                           placeholder={'Количество'}
                           addClassName={'w-full md:w-1/3'}
                           value={employerCount}
                           onChange={(e) => setEmployerCount(parseInt(e.target.value))}
                    />
                </>
            }
            <div className={'flex gap-6 mt-10 justify-end items-center'}>
                <Text content={`${isSavingSucceeded ? 'Сохранено!' : ''}`}/>
                <Link href={'/account'}
                      className={'inline-block text-lg py-1.5 h-10 px-8 border rounded-lg hover:bg-zinc-100 transition-all'}
                >
                    Назад
                </Link>
                <Button disabled={isSaving} content={`${isSaving ? 'Сохранение...' : 'Сохранить'}`}
                        onClick={handleSubmit} addClassName={'px-8'}/>
            </div>
        </>
    )
}
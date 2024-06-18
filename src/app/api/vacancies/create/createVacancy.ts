import {Contacts, Salary} from '@/types/cards'
import axios from 'axios'

export async function createVacancy({ownerId, contacts, salary, name, companyId}: {
    ownerId: number,
    contacts?: Contacts,
    salary: Salary,
    name: string,
    companyId: number
}) {
    const response = await axios.post(
        `/api/vacancies/create`,
        JSON.stringify({ownerId, contacts, salary, name, companyId})
    )
    return response.data
}
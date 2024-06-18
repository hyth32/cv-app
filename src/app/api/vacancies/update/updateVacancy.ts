import axios from 'axios'
import {Contacts, Salary} from '@/types/cards'

export async function updateVacancy({id, contacts, salary, name, location, companyId}: {
    id: number,
    name: string,
    salary: Salary,
    contacts: Contacts,
    location: string,
    companyId: number
}) {
    const response = await axios.post(
        `../api/vacancies/update?id=${id}`,
        JSON.stringify({contacts, salary, name, location, companyId})
    )
    return response.data
}
import axios from 'axios'
import {Contacts, Salary} from '@/types/cards'

export async function updateResume({id, name, salary, contacts, stack, image}: {
    id: number,
    name: string,
    salary: Salary,
    contacts: Contacts,
    stack: string[],
    image?: string
}) {
    const response = await axios.post(
        `../api/resumes/update?id=${id}`,
        JSON.stringify({name, salary, contacts, stack, image})
    )
    return response.data
}
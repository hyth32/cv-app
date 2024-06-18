import {Contacts, Salary} from '@/types/cards'
import axios from 'axios'

export async function createResume({ownerId, contacts, salary, name, stack, image}: {
    ownerId: number,
    contacts?: Contacts,
    salary: Salary,
    name: string,
    stack: string[],
    image?: string
}) {
    const response = await axios.post(
        `/api/resumes/create`,
        JSON.stringify({ownerId, contacts, salary, name, stack, image})
    )
    return response.data
}
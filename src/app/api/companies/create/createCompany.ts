import axios from 'axios'

export async function createCompany({ownerId, name, location, employerCount, image}: {
    ownerId: number,
    name: string,
    location: string,
    employerCount: number,
    image?: string,
}) {
    const response = await axios.post(
        `/api/companies/create`,
        JSON.stringify({ownerId, name, location, employerCount, image})
    )
    return response.data
}
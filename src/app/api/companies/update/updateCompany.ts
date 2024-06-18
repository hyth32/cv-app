import axios from 'axios'

export async function updateCompany({id, name, location, employerCount, image}: {
    id: number,
    name: string,
    location: string,
    employerCount: number,
    image?: string
}) {
    const response = await axios.post(
        `../api/companies/update?id=${id}`,
        JSON.stringify({name, location, employerCount, image})
    )
    return response.data
}
import axios from 'axios'

export async function getCompanyById(id: number) {
    const response = await axios.get(`/api/companies/get_by_id?id=${id}`)
    return response.data
}
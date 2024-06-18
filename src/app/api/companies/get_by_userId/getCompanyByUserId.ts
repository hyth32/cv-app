import axios from 'axios'

export async function getCompanyByUserId(id: number) {
    const response = await axios.get(`/api/companies/get_by_userId?userId=${id}`)
    return response.data
}
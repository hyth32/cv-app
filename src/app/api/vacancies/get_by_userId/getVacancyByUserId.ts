import axios from 'axios'

export async function getVacancyByUserId(id: number) {
    const response = await axios.get(`/api/vacancies/get_by_userId?userId=${id}`)
    return response.data
}
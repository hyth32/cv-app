import axios from 'axios'

export async function getVacancyById(id: number) {
    const response = await axios.get(`/api/vacancies/get_by_id?id=${id}`)
    return response.data
}
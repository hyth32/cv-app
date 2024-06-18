import axios from 'axios'

export async function deleteVacancyById(id: number) {
    const response = await axios.get(`/api/vacancies/delete?id=${id}`)
    return response.data
}
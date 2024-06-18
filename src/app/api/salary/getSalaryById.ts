import axios from 'axios'

export async function getSalaryById(id: number) {
    const response = await axios.get(`/api/salary?id=${id}`)
    return response.data
}
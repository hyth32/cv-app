import axios from 'axios'

export async function getResumeById(id: number) {
    const response = await axios.get(`/api/resumes/get_by_id?id=${id}`)
    return response.data
}
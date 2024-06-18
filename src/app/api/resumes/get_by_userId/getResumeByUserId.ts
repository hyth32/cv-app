import axios from 'axios'

export async function getResumeByUserId(id: number) {
    const response = await axios.get(`/api/resumes/get_by_userId?userId=${id}`)
    return response.data
}
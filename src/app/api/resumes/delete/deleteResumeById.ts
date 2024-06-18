import axios from 'axios'

export async function deleteResumeById(id: number) {
    const response = await axios.get(`/api/resumes/delete?id=${id}`)
    return response.data
}
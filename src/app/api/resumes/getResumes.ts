import axios from 'axios'

export async function getResumes() {
    const response = await axios.get(`/api/resumes`)
    return response.data
}
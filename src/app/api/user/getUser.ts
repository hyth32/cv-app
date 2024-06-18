import axios from 'axios'

export async function getUser(login: string) {
    const response = await axios.get(`/api/user?login=${login}`)
    return response.data
}
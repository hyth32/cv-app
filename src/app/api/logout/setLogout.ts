import axios from 'axios'

export async function setLogout() {
    const response = await axios.get('/api/logout')
    return response.data
}
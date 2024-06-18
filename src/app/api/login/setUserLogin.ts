import axios from 'axios'

export async function setUserLogin(login: string, password: string) {
    const response = await axios.post(
        `/api/login`,
        JSON.stringify({login, password})
    )
    return response.data
}
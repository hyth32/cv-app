import axios from 'axios'

export async function changePassword(login: string, newPassword: string, repeatedPassword: string) {
    const response = await axios.post(
        `/api/user/change-password?login=${login}`,
        JSON.stringify({password: newPassword, repeatedPassword: repeatedPassword})
    )
    return response.data
}
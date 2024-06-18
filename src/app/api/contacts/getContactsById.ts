import axios from 'axios'

export async function getContactsById(id: number) {
    const response = await axios.get(`/api/contacts?id=${id}`)
    return response.data
}
import axios from 'axios'

export async function getVacancies() {
    const response = await axios.get(`/api/vacancies`)
    return response.data
}

export async function getVacanciesBySearch(search: string) {
    const response = await axios.get(`api/vacancies?q=${search}`)
    return response.data
}
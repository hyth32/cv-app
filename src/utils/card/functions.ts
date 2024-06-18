import {getUser} from '@/app/api/user/getUser'
import {getCompanyByUserId} from '@/app/api/companies/get_by_userId/getCompanyByUserId'
import {getCompanyById} from '@/app/api/companies/get_by_id/getCompanyById'
import {getVacancyByUserId} from '@/app/api/vacancies/get_by_userId/getVacancyByUserId'
import {createVacancy} from '@/app/api/vacancies/create/createVacancy'
import {createResume} from '@/app/api/resumes/create/createResume'
import {getResumeByUserId} from '@/app/api/resumes/get_by_userId/getResumeByUserId'
import {getVacancies} from '@/app/api/vacancies/getVacancies'
import {getCompanies} from '@/app/api/companies/getCompanies'
import {getResumes} from '@/app/api/resumes/getResumes'

export const getUserId = async (login: string) => {
    const response = await getUser(login)
    const {error, data} = response
    if (!error) {
        return data.id
    } else return null
}

export const getCompanyId = async (login: string) => {
    const userId = await getUserId(login)
    const response = await getCompanyByUserId(userId)
    const {error, data} = response
    if (!error) {
        return data[0].id
    } else return null
}

export const getUserCompany = async (login: string) => {
    const companyId = await getCompanyId(login)
    const response = await getCompanyById(companyId)
    const {error, data} = response
    if (!error) {
        return data
    } else return []
}

export const getUserVacancies = async (login: string) => {
    const userId = await getUserId(login)
    const response = await getVacancyByUserId(userId)
    const {error, data} = response
    if (!error) {
        return data
    } else return []
}

export const getUserResumes = async (login: string) => {
    const userId = await getUserId(login)
    const response = await getResumeByUserId(userId)
    const {error, data} = response
    if (!error) {
        return data
    } else return []
}

export const getAllVacancies = async () => {
    const response = await getVacancies()
    const {error, data} = response
    if (!error) {
        return data
    } else return []
}

export const getAllCompanies = async () => {
    const response = await getCompanies()
    const {error, data} = response
    if (!error) {
        return data
    } else return []
}

export const getAllResumes = async () => {
    const response = await getResumes()
    const {error, data} = response
    if (!error) {
        return data
    } else return []
}

export const createVacancyCard = async (login: string) => {
    const userId = await getUserId(login)
    const companyId = await getCompanyId(login)

    const newVacancy = {
        ownerId: userId,
        companyId: companyId,
        name: 'Новая вакансия',
        contacts: {
            phone: '',
            email: '',
            links: []
        },
        salary: {
            from: 0,
            to: 0
        },
        location: 'Неизвестно'
    }
    const response = await createVacancy(newVacancy)
    const {error} = response
    return !error
}

export const createResumeCard = async (login: string) => {
    const userId = await getUserId(login)
    const newResume = {
        ownerId: userId,
        name: 'Новое резюме',
        contacts: {
            phone: '',
            email: '',
            links: []
        },
        salary: {
            from: 0,
            to: 0
        },
        stack: []
    }
    const response = await createResume(newResume)
    const {error} = response
    return !error
}
export type Salary = {
    from: number,
    to?: number,
}

export type Contacts = {
    email?: string,
    phone?: string,
    links?: string[]
}

export type Vacancy = {
    id: number,
    owner: string,
    type: string,
    name: string,
    companyId: number,
    salary: Salary,
    location: string,
    contacts: Contacts
}

export type Company = {
    id: number,
    owner: string,
    type: string,
    name: string,
    location: string,
    employerCount: number,
    image?: string
}

export type Resume = {
    id: number,
    owner: string,
    type: string,
    name: string,
    salary: Salary,
    stack: string[],
    contacts: Contacts,
    image?: string
}
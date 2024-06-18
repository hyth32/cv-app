import axios from 'axios'
import bcrypt from 'bcryptjs'
import {User} from '@/types/users'

export async function createUser(user: User) {
    const hashedPass = await bcrypt.hash(user.password, 10)
    const newUser = {...user, password: hashedPass}
    const response = await axios.post(
        `/api/user/create`,
        JSON.stringify(newUser)
    )

    return response.data
}
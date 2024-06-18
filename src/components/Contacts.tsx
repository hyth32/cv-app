import {Contacts as ContactsType} from '@/types/cards'
import Title from '@/UI/Title'
import Text from '@/UI/Text'

export default function Contacts({contacts}: { contacts: ContactsType }) {
    return (
        <>
            <Title type={'h3'}
                   content={'Контакты'}
                   addClassName={'mt-2'}/>
            {contacts.email === '' && contacts.phone === '' &&
                <Text content={'Не указаны'}/>}
            {contacts.email !== '' &&
                <Text content={`Email: ${contacts.email}`}/>}
            {contacts.phone !== '' &&
                <Text content={`Phone: ${contacts.phone}`}/>}
        </>
    )
}
import {Salary as SalaryType} from '@/types/cards'
import Text from '@/UI/Text'
import Title from '@/UI/Title'

const getLocale = (number: number) => `${number.toLocaleString('ru-RU')}₽`
export default function Salary({salary, isModal}: {
    salary: SalaryType,
    isModal?: boolean
}) {
    return (
        <>
            {isModal && <Title type={'h3'} content={'Зарплата'}/>}
            <Text content={
                salary.from > 0 && salary.to && salary.to > 0 ?
                    `${salary.from && getLocale(salary.from)} 
                    ${salary.from && salary.to && salary.to > salary.from && salary.to > 0 ? '-' : ''} 
                    ${salary.to && salary.to > 0 && salary.to > salary.from ?
                        getLocale(salary.to) : ''}`
                    : isModal ? 'Не указана' : 'Не указано'
            } addClassName={`${isModal ? '' : ''}`}/>
        </>
    )
}
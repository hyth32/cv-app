import Text from '@/UI/Text'
import Title from '@/UI/Title'

export default function Location({location, isModal}: { location: string, isModal?: boolean }) {
    const mainStyle = 'mt-2 self-end inline-block px-2 py-1 rounded-md bg-zinc-600 text-white font-medium'
    return (
        <>
            {isModal && <Title type={'h3'} addClassName={'mt-2'} content={'Местоположение'}/>}
            <Text
                addClassName={`${isModal ? '' : mainStyle}`}
                content={location ? location : 'Не указано'}
            />
        </>
    )
}
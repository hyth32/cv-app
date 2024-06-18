import Text from '@/UI/Text'
import Title from '@/UI/Title'

export default function Stack({stack, isModal, isDraft}: { stack: string[], isModal?: boolean, isDraft?: boolean }) {
    return (
        <>
            {isModal && <Title content={'Стек'} type={'h3'} addClassName={'mt-2'}/>}
            <div className={`flex gap-2 flex-wrap`}>
                {isDraft ?
                    stack.map((stackItem, index) => (
                        <Text key={index}
                              addClassName={'px-2 py-1 bg-zinc-600 rounded-md text-white font-medium'}
                              content={stackItem}
                        />
                    ))
                    :
                    stack.slice(0,2).map((stackItem, index) => (
                        <Text key={index}
                              addClassName={'px-2 py-1 bg-zinc-600 rounded-md text-white font-medium'}
                              content={stackItem}
                        />
                    ))
                }
            </div>
        </>
    )
}
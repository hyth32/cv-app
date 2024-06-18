import Button from '@/UI/Button'

export default function CloseButton({onClose}: { onClose: () => void }) {
    return (
        <Button onClick={() => onClose()}
                overlap={true}
                addClassName="bg-zinc-600 hover:bg-zinc-700 transition-all text-white text-sm px-2 py-1 rounded-full absolute right-3 top-4"
                content={'✕'}/>
    )
}
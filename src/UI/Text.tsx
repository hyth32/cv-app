export default function Text({addClassName, content}: { addClassName?: string, content: string }) {
    return (
        <p className={`${addClassName}`}>
            {content}
        </p>
    )
}
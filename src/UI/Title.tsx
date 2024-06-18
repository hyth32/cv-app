export default function Title({type, addClassName, content}: {
    type?: string,
    addClassName?: string,
    content: string
}) {
    switch (type) {
        case 'h2':
            return <h2 className={`font-semibold text-2xl mb-4 text-balance ${addClassName}`}>{content}</h2>
        case 'h3':
            return <h3 className={`font-semibold text-xl text-balance line-clamp-2 ${addClassName}`}>{content}</h3>
        default:
            return <h1 className={`font-bold text-3xl text-balance ${addClassName}`}><a href={'/'}>{content}</a></h1>
    }
}
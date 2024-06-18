import {ButtonHTMLAttributes} from 'react'

export default function Button({addClassName, overlap, content, ...props}: {
    addClassName?: string,
    overlap?: boolean,
    content: string,
} & ButtonHTMLAttributes<HTMLButtonElement>) {
    const mainStyle = 'h-10 bg-zinc-900 hover:bg-zinc-800 transition-all text-white rounded-lg md:text-lg'
    return (
        <button {...props} className={`${overlap ? '' : mainStyle} ${addClassName}`}>
            {content}
        </button>
    )
}
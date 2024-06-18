import {InputHTMLAttributes} from 'react'

export default function Input({addClassName, ...props}: {
    addClassName?: string
} & InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input {...props} className={`border border-zinc-200 rounded-lg h-10 pl-4 ${addClassName}`}/>
    )
}
import React, {FormHTMLAttributes} from 'react'

export default function Form({addClassName, children, ...props}: {
    children: React.ReactNode
    addClassName?: string
} & FormHTMLAttributes<HTMLFormElement>) {
    return (
        <form {...props} className={`flex flex-col mt-8 gap-2 ${addClassName}`}>
            {children}
        </form>
    )
}
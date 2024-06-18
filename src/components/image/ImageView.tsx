import React from "react"

export default function ImageView({image, size}: { image: string, size?: string }) {
    return (
        <div
            className={`${size ? size : 'w-24 min-w-24 h-24 min-h-24'} bg-zinc-300 rounded-full bg-cover bg-center overflow-hidden border transition-all inset-0 flex justify-center items-center`}
            style={{backgroundImage: `url(${image})`}}>
        </div>
    )
}
import Text from "@/UI/Text";
import React from "react";

export default function ImageUpload({image, handleChange}: {
    image: string,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
    return (
        <div className={'relative w-40 h-40 rounded-full overflow-hidden border hover:bg-zinc-100 transition-all'}>
            {image && (
                <div
                    className="size-full bg-cover bg-center"
                    style={{backgroundImage: `url(${image})`}}
                />
            )}
            <input
                type={'file'}
                accept={'image/*'}
                onChange={handleChange}
                className={'absolute inset-0 w-full h-full opacity-0'}
                id={'image'}
            />
            <label htmlFor={'image'}
                   className={'absolute inset-0 flex justify-center items-center cursor-pointer'}>
                <Text content={image !== '' ? '' : '+'} addClassName={'text-3xl font-medium text-zinc-600'}/>
            </label>
        </div>
    )
}
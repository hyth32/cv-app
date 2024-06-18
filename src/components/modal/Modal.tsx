'use client'
import React, {useEffect} from 'react'
import styles from './Modal.module.css'
import CloseButton from '@/UI/CloseButton'

export default function Modal({onClose, children}: {
    onClose: any,
    children: React.ReactNode
}) {
    useEffect(() => {
        document.addEventListener('keydown', (e) => e.key === 'Escape' && onClose())
    }, [onClose])

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
                <div className={styles.overlay} onClick={() => onClose()}></div>
                <div className={styles.content}>
                    <CloseButton onClose={onClose}/>
                    {children}
                </div>
            </div>
        </div>
    )
}
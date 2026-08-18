import React from 'react'

type ButtonProps = {
    children: React.ReactNode
    onClick: () => void
    className?: string
}

export const ButtonComponent: React.FC<ButtonProps> = ({ children, onClick, className }) => {
    return (
        <button className={className} onClick={onClick}>
            {children}
        </button>
    )
}

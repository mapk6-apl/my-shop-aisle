import React from 'react'
import './Overlay.css'

type OverlayProps = {
    children: React.ReactNode
}

export const Overlay: React.FC<OverlayProps> = ({ children }) => {
    return (
        <div className='overlay-background'>
            {children}
        </div>
    )
}
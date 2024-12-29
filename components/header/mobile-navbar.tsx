import React from 'react'

interface MobileNavBarProps {
    containerStyles?: string;
}

function MobileNavBar({ containerStyles }: MobileNavBarProps) {
    return (
        <div className={`${containerStyles}`}>MobileNavBar</div>
    )
}

export default MobileNavBar
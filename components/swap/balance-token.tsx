'use client';
import React from 'react'

interface BalanceTokenProps {
    balance: string;
}

const BalanceToken = ({ balance }: BalanceTokenProps) => {
    return (
        <div className="flex flex-row justify-end">
            <span className='text-xs font-light'>Balance: {balance}</span>
        </div>
    )
}

export default BalanceToken
'use client';
import { cn } from '@/lib/utils';
import { Token } from '@/utils/types.util';
import { Separator } from '@radix-ui/react-separator';
import React, { useState } from 'react'

interface CreateLiquidityDetailProps {
    className?: string,
    token0?: Token,
    token1?: Token
}

const CreateLiquidityDetail = ({ className, token0, token1 }: CreateLiquidityDetailProps) => {
    const [localToken0, setLocalToken0] = useState<Token | undefined>(token0);
    const [localToken1, setLocalToken1] = useState<Token | undefined>(token1);

    return (
        <div className={cn(
            "flex flex-col justify-center gap-3 p-5 border-2 border-primary rounded-xl",
            className
        )}>
            <span className='text-lg font-extralight'>Create your Pool</span>
            <div className="">
                <span>Your Balances</span>
                <Separator className='h-[1px] w-full' />
                <div className="grid grid-cols-2">
                    <div className="flex flex-col items-center justify-center gap-4">
                        <span>0.00</span>
                        <span>{`Pooled any ${localToken0?.name}/${localToken1?.name}`}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-4">
                        <span>0.00</span>
                        <span>{`Staked any ${localToken0?.name}/${localToken1?.name}`}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateLiquidityDetail
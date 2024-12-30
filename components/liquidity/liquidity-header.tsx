'use client';
import { cn } from '@/lib/utils';
import React from 'react'
import { Button } from '@/components/ui/button'
import { usePathname, useRouter } from 'next/navigation';

interface LiquidityHeaderProps {
    className?: string
}

const LiquidityHeader = ({ className }: LiquidityHeaderProps) => {
    const router = useRouter();
    const pathName = usePathname();

    return (
        <div className={cn(
            `flex flex-row items-center justify-between`,
            className
        )}>
            <div className="flex flex-col justify-center gap-3 w-full">
                <span className='text-4xl font-bold'>Liquidity Pools</span>
                <span className='text-base font-thin'>Pools containing your tokens to provide liquidity. Stake your LP tokens to earn</span>
            </div>
            <Button
                variant={'secondary'}
                onClick={() => router.push(`${pathName}/create`)}
                className='text-background hover:scale-95 transition-all duration-300 ease-linear'
            >Add liquidity</Button>
        </div>
    )
}

export default LiquidityHeader
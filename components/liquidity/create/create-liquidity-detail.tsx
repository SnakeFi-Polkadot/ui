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
            "flex flex-col justify-center gap-7 p-5 border-2 border-primary rounded-xl text-sm font-extralight",
            className
        )}>
            <span className='text-lg font-semibold'>Create your Pool</span>
            <div className="flex flex-col justify-center gap-3">
                <span className='text-sm font-medium'>Your Balances</span>
                <Separator className='h-[0.5px] w-full bg-foreground/50' />
                <div className="grid grid-cols-2 text-xs font-thin">
                    <div className="flex flex-col items-center justify-center gap-1">
                        <span>0.00</span>
                        <span>{`Pooled any ${localToken0?.name || "..."}/${localToken1?.name || "..."}`}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-1">
                        <span>0.00</span>
                        <span>{`Staked any ${localToken0?.name || "..."}/${localToken1?.name || "..."}`}</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center gap-1">
                <span className='text-sm font-medium'>Create pool</span>
                <Separator className='h-[0.5px] w-full bg-foreground/50' />
                <div className="flex flex-col justify-center gap-3 text-xs text-secondary/40">
                    <div className="flex flex-col justify-center gap-1">
                        <span>1. Select the tokens and input the amounts.</span>
                        <span>The ratio of amount tokens you deposit will set your pool's price.</span>
                    </div>
                    <div className="flex flex-col justify-center gap-1">
                        <span>2. Select the pool type.</span>
                        <span>We provide 2 types for liquidity pool:</span>
                        <span>Volatile pools are for volatile tokens such as WND/USDC, WETH/USDC, WBTC/USDT.</span>
                        <span>Stable pools are for stablecoin such as USDC/USDT.</span>
                    </div>
                    <div className="flex flex-col justify-center gap-1">
                        <span>3. Create pool.</span>
                        <span>After creation, the LP tokens will be sent to you representing your shares of pools.</span>
                    </div>
                    <div className="flex flex-col justify-center gap-1">
                        <span>4. Create gauge if tokens are whitelisted and stake your LP token into gauge.</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateLiquidityDetail